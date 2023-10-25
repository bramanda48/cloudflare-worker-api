import { Product } from "@prisma/client/edge";
import { BaseService } from "./base.service";
import { NotFoundException } from "@src/exceptions/not-found.exception";

export class ProductsService extends BaseService {
  constructor(env: EnvironmentBindings) {
    super(env);
  }

  public async getProduct(page: number, limit: number) {
    return this.prismaClient.product.findManyWithPagination({
      page,
      limit,
    });
  }

  public async addProduct({ title, content, price }: Pick<Product, "title" | "content" | "price">) {
    return await this.prismaClient.product.create({
      data: { title, content, price },
    });
  }

  public async editProduct(id: number, product: Partial<Product>) {
    const findProduct = await this.prismaClient.product.findFirst({
      where: { id },
    });
    if (!findProduct) {
      throw new NotFoundException("PRODUCT_NOT_FOUND", "Product not found");
    }
    return await this.prismaClient.product.update({
      data: { ...findProduct, ...product },
      where: { id },
    });
  }

  public async deleteProduct(id: number) {
    return await this.prismaClient.product.delete({
      where: { id },
    });
  }
}
