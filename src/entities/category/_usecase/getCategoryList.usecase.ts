import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createCategoryAbility } from "../_domain/category.ability";
import { CategoryEntity, CategoryId } from "../_domain/types";
import {
  CategoryRepository,
  categoryRepository,
} from "../_repository/category.repo";

type GetCategoryList = {
  session: SessionEntity;
};

class GetCategoryListUseCase {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async exec(data: GetCategoryList): Promise<CategoryEntity[]> {
    const { session } = data;
    const { canGetCategory } = createCategoryAbility(session);

    if (!canGetCategory()) {
      throw new AuthorizatoinError();
    }

    return await this.categoryRepo.getCategoryList();
  }
}

export const getCategoryListUseCase = new GetCategoryListUseCase(
  categoryRepository,
);
