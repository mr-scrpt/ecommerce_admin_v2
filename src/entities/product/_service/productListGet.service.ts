import { injectable } from "inversify";
import { IProductRepository } from "../_domain/repository.type";
import { Product } from "../_domain/types";

@injectable()
export class ProductListGetService {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(): Promise<Array<Product>> {
    return await this.productRepo.getList();
  }
}
