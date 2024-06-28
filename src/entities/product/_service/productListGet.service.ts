import { Product } from "@/kernel/domain/product/product.type";
import { IProductRepository } from "@/kernel/domain/product/repository.type";
import { injectable } from "inversify";

@injectable()
export class ProductListGetService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(): Promise<Array<Product>> {
    return await this.productRepo.getList();
  }
}
