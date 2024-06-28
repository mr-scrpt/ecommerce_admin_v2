import { injectable } from "inversify";
import { ProductGetSelector, ProductRelation } from "../_domain/product.types";
import { IProductRepository } from "@/kernel/domain/product/repository.type";

@injectable()
export class ProductRelationGetService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(selector: ProductGetSelector): Promise<ProductRelation> {
    return await this.productRepo.getWithRelation(selector);
  }
}
