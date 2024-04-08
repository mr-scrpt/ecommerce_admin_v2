import { CategoryEntity } from "@/entities/category";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { CategoryCreateComplexible } from "../_domain/types";
import { CategoryCreateTx } from "../_tx/categoryCreate.transaction";
import { createCategoryAbility } from "@/entities/category/server";
import { injectable } from "inversify";

type CreateCategory = {
  dataToCreate: CategoryCreateComplexible;
  session: SessionEntity;
};

@injectable()
export class CreateCategoryComplexibleUseCase {
  constructor(private readonly categoryCreateTx: CategoryCreateTx) {}

  async exec(data: CreateCategory): Promise<CategoryEntity> {
    const { dataToCreate, session } = data;

    const { canCreateCategory } = createCategoryAbility(session);

    if (!canCreateCategory()) {
      throw new ForbiddenError();
    }

    return await this.categoryCreateTx.createCategoryComplexible(dataToCreate);
  }
}
