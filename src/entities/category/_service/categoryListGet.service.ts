import { injectable } from "inversify";
import { CategoryRepository } from "../server";
import { Category } from "../_domain/types";

@injectable()
export class CategoryListGetService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepo.getCategoryList();
  }
}
