import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createCategoryAbility } from "../_domain/category.ability";
import { CategoryEntity, CategoryId } from "../_domain/types";
import { CategoryRepository } from "../_repository/category.repo";

type GetCategory = {
  categoryId: CategoryId;
  session: SessionEntity;
};

@injectable()
export class GetCategoryUseCase {
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
