import { injectable } from "inversify";
import { ProductGetByIdListSelector } from "../_domain/product.types";
import { Product } from "@/kernel/domain/product/product.type";
import { IProductRepository } from "@/kernel/domain/product/repository.type";

@injectable()
export class ProductListGetByIdListService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(selector: ProductGetByIdListSelector): Promise<Array<Product>> {
    return await this.productRepo.getListByListId(selector);
  }
}
