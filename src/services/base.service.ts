import { PrismaClient } from "@prisma/client/edge";

export class BaseService {
  protected prismaClient;
  constructor(env: EnvironmentBindings) {
    this.prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
      log: ["query", "info", "error", "warn"],
    });
  }
}
