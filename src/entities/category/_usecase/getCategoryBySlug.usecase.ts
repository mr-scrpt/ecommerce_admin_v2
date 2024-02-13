import { CategoryEntity, CategoryId } from "../_domain/types";
import {
  CategoryRepository,
  categoryRepository,
} from "../_repository/category.repo";
import { createCategoryAbility } from "../_domain/category.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";

type GetCategory = {
  categorySlug: CategoryId;
  session: SessionEntity;
};

class GetCategoryBySlugUseCase {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async exec(data: GetCategory): Promise<CategoryEntity> {
    const { categorySlug, session } = data;
    const { canGetCategory } = createCategoryAbility(session);

    if (!canGetCategory()) {
      throw new AuthorizatoinError();
    }

    return await this.categoryRepo.getCategoryBySlug(categorySlug);
  }
}

export const getCategoryBySlugUseCase = new GetCategoryBySlugUseCase(
  categoryRepository,
);
