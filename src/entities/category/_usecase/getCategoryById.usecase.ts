import { CategoryEntity, CategoryId } from "../_domain/types";
import {
  CategoryRepository,
  categoryRepository,
} from "../_repository/category.repo";
import { createCategoryAbility } from "../_domain/category.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";

type GetCategory = {
  categoryId: CategoryId;
  session: SessionEntity;
};

class GetCategoryByIdUseCase {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async exec(data: GetCategory): Promise<CategoryEntity> {
    const { categoryId, session } = data;
    const { canGetCategory } = createCategoryAbility(session);

    if (!canGetCategory()) {
      throw new AuthorizatoinError();
    }

    return await this.categoryRepo.getCategory(categoryId);
  }
}

export const getCategoryByIdUseCase = new GetCategoryByIdUseCase(
  categoryRepository,
);
