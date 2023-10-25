import { Prisma, PrismaClient } from "@prisma/client/edge";

interface FindManyWithPaginationArgs<T> {
  select?: Prisma.Args<T, "findFirst">["select"];
  where?: Prisma.Args<T, "findFirst">["where"];
  orderBy?: Prisma.Args<T, "findFirst">["orderBy"];
  page?: number;
  limit?: number;
}

export class BaseService {
  protected prismaClient;
  constructor(env: EnvironmentBindings) {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
      log: ["query", "info", "error", "warn"],
    }).$extends({
      model: {
        $allModels: {
          async findManyWithPagination<T>(
            this: T,
            { select, where, orderBy, page, limit }: FindManyWithPaginationArgs<T>,
          ): Promise<[number, Prisma.Result<T, {}, "findMany">]> {
            // Default page and limit
            page = page ?? 1;
            limit = limit ?? 10;
            limit = Math.abs(limit);

            // Get the current model at runtime
            const offsets = (page - 1) * limit;
            const context = Prisma.getExtensionContext(this);
            const total = await (context as any).count({
              where,
            });

            let totalPage = Math.ceil(total / limit);
            let result = [];
            if (page <= totalPage) {
              result = await (context as any).findMany({
                select,
                where,
                orderBy,
                take: page >= 0 ? limit : undefined,
                skip: page >= 0 ? offsets : undefined,
              });
            }
            return [total, result];
          },
        },
      },
    });
    this.prismaClient = prisma;
  }
}
