import { AuthorizatoinError } from "@/shared/lib/errors";
import { CategoryEntity, CategoryId } from "../_domain/types";
import { createCategoryAbility } from "../_domain/category.ability";
import {
  CategoryRepository,
  categoryRepository,
} from "../_repository/category.repo";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { Category } from "@prisma/client";

type GetCategoryList = {
  categoryId: CategoryId;
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
