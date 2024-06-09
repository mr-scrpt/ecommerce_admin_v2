import { injectable } from "inversify";
import { ICategoryRepository } from "../_domain/repository.type";
import { Category } from "../_domain/types";

@injectable()
export class CategoryListGetService {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepo.getCategoryList();
  }
}
