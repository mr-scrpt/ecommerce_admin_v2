import { injectable } from "inversify";
import { Product, ProductGetSelector } from "../_domain/product.types";
import { IProductRepository } from "../_domain/repository.type";

@injectable()
export class ProductGetService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(selector: ProductGetSelector): Promise<Product> {
    return await this.productRepo.get(selector);
  }
}
