import { createId } from "@/shared/lib/id";
import { CategoryEntity, CategorySlug } from "../_domain/types";
import {
  CategoryRepository,
  categoryRepository,
} from "../_repository/category.repo";

type CreateCategory = {
  name: string;
  slug: CategorySlug;
};

class CreateCategoryUseCase {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async exec(data: CreateCategory) {
    const category: CategoryEntity = {
      id: createId(),
      ...data,
    };

    return await this.categoryRepo.createCategory(category);
  }
}

export const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
);
