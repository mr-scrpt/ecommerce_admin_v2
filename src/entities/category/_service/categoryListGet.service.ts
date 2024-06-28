import { injectable } from "inversify";
import { Category } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";

@injectable()
export class CategoryListGetService {
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepo.getList();
  }
}
