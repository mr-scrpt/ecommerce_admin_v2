import { ForbiddenError } from "@/shared/lib/errors";
import { CategoryRemoveTx } from "../_tx/categoryRemove.transaction";
import { CategoryEntity, CategoryId } from "@/entities/category";
import { SessionEntity } from "@/shared/lib/user";
import { createCategoryAbility } from "@/entities/category/server";
import { injectable } from "inversify";

type RemoveCategory = {
  categoryId: CategoryId;
  session: SessionEntity;
};

@injectable()
export class RemoveCategoryComplexibleUseCase {
  constructor(private readonly categoryRemoveTx: CategoryRemoveTx) {}

  async exec(data: RemoveCategory): Promise<CategoryEntity> {
    const { categoryId, session } = data;
    const { canRemoveCategory } = createCategoryAbility(session);

    if (!canRemoveCategory()) {
      throw new ForbiddenError();
    }

    return await this.categoryRemoveTx.removeCategoryById(categoryId);
  }
}
