import { Product } from "@prisma/client/edge";
import { BaseService } from "./base.service";

export class ProductService extends BaseService {
  constructor(env: EnvironmentBindings) {
    super(env);
  }

  public async getProduct() {
    return await this.prismaClient.product.findMany();
  }

  public async addProduct(product: Product) {
    return await this.prismaClient.product.create({
      data: product,
    });
  }

  public async editProduct(id: number, product: Product) {
    return await this.prismaClient.product.update({
      data: product,
      where: { id },
    });
  }

  public async deleteProduct(id: number) {
    return await this.prismaClient.product.delete({
      where: { id },
    });
  }
}
