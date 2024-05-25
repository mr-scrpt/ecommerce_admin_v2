import { injectable } from "inversify";
import { CategoryRepository } from "../server";

@injectable()
export class CategoryListGetService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async execute() {
    return await this.categoryRepo.getCategoryList();
  }
}
