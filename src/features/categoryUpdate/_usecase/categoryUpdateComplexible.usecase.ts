import { CategoryEntity } from "@/entities/category";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { CategoryUpdateComplexible } from "../_domain/types";
import {
  CategoryUpdateTx,
  categoryUpdateTx,
} from "../_tx/categoryUpdate.transaction";
import { createCategoryAbility } from "@/entities/category/server";

type UpdateCategory = {
  dataToUpdate: CategoryUpdateComplexible;
  session: SessionEntity;
};

class UpdateCategoryComplexibleUseCase {
  constructor(private readonly categoryUpdateTx: CategoryUpdateTx) {}

  async exec(data: UpdateCategory): Promise<CategoryEntity> {
    const { dataToUpdate, session } = data;

    const { canUpdateCategory } = createCategoryAbility(session);

    if (!canUpdateCategory()) {
      throw new ForbiddenError();
    }

    return await this.categoryUpdateTx.updateCategoryComplexible(dataToUpdate);
  }
}

export const updateCategoryComplexibleUseCase =
  new UpdateCategoryComplexibleUseCase(categoryUpdateTx);
