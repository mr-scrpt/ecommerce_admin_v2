import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createCategoryAbility } from "../_domain/category.ability";
import { Category } from "../_domain/types";
import {
  CategoryRepository,
  categoryRepository,
} from "../_repository/category.repo";

type CreateCategory = {
  session: SessionEntity;
  categoryData: Category;
};

class CreateCategoryUseCase {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async exec(data: CreateCategory) {
    const { categoryData, session } = data;
    const { canCreateCategory } = createCategoryAbility(session);

    if (!canCreateCategory()) {
      throw new AuthorizatoinError();
    }

    return await this.categoryRepo.createCategory(categoryData);
  }
}

export const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository,
);
