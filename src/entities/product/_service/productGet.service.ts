import { injectable } from "inversify";
import { ProductGetSelector } from "../_domain/product.types";
import { IProductRepository } from "@/kernel/domain/product/repository.type";
import { Product } from "@/kernel/domain/product/product.type";

@injectable()
export class ProductGetService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(selector: ProductGetSelector): Promise<Product> {
    return await this.productRepo.get(selector);
  }
}
