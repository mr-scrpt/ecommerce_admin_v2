import { injectable } from "inversify";
import { IProductRepository } from "../_domain/repository.type";
import { Product, ProductGetByIdListSelector } from "../_domain/product.types";

@injectable()
export class ProductListGetByIdListService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(selector: ProductGetByIdListSelector): Promise<Array<Product>> {
    return await this.productRepo.getListByListId(selector);
  }
}
