import { ForbiddenError } from "@/shared/lib/errors";
import { Category, CategoryEntity, CategoryId } from "../_domain/types";
import { SessionEntity } from "@/shared/lib/user";
import {
  CategoryRepository,
  categoryRepository,
} from "../_repository/category.repo";
import { createCategoryAbility } from "../_domain/category.ability";

type UpdateCategory = {
  categoryId: CategoryId;
  categoryData: Partial<Category>;
  session: SessionEntity;
};

class UpdateCategoryUseCase {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async exec(data: UpdateCategory): Promise<CategoryEntity> {
    const { categoryId, categoryData, session } = data;
    const { canUpdateCategory } = createCategoryAbility(session);

    if (!canUpdateCategory()) {
      throw new ForbiddenError();
    }

    return await this.categoryRepo.updateCategory(categoryId, categoryData);
  }
}

export const updateCategoryUseCase = new UpdateCategoryUseCase(
  categoryRepository,
);
