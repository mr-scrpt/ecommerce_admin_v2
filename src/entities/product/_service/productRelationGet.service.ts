import { injectable } from "inversify";
import { IProductRepository } from "../_domain/repository.type";
import { ProductGetSelector, ProductRelation } from "../_domain/types";

@injectable()
export class ProductRelationGetService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(selector: ProductGetSelector): Promise<ProductRelation> {
    return await this.productRepo.getWithRelation(selector);
  }
}
