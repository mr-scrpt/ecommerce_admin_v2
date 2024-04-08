import { CategoryEntity, CategoryId } from "../_domain/types";
import { CategoryRepository } from "../_repository/category.repo";
import { createCategoryAbility } from "../_domain/category.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";

type GetCategoryWithRelation = {
  categoryId: CategoryId;
  session: SessionEntity;
};

@injectable()
export class GetCategoryWithRelationUseCase {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async exec(data: GetCategoryWithRelation): Promise<CategoryEntity> {
    const { categoryId, session } = data;
    const { canGetCategory } = createCategoryAbility(session);

    if (!canGetCategory()) {
      throw new AuthorizatoinError();
    }

    return await this.categoryRepo.getCategoryWithRelation(categoryId);
  }
}
