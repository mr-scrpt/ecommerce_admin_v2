import { injectable } from "inversify";
import { IProductRepository } from "../_domain/repository.type";
import { Product, ProductSearchSelector } from "../_domain/types";

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
