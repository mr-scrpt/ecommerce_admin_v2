import { injectable } from "inversify";
import { ProductSearchSelector } from "../_domain/product.types";
import { IProductRepository } from "@/kernel/domain/product/repository.type";
import { Product } from "@/kernel/domain/product/product.type";

@injectable()
export class ProductListSearchService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(selector: ProductSearchSelector): Promise<Array<Product>> {
    const { q } = selector;
    if (!q) {
      return [];
    }
    return await this.productRepo.searchList(selector);
  }
}
