import {
  CategoryRelationEntity,
  createCategoryAbility,
} from "@/entities/category";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { CategoryCreateComplexible } from "../_domain/types";
import {
  CategoryCreateTx,
  categoryCreateTx,
} from "../_tx/categoryCreate.transaction";

type CreateCategory = {
  dataToCreate: CategoryCreateComplexible;
  session: SessionEntity;
};

class CreateCategoryComplexibleUseCase {
  constructor(private readonly categoryCreateTx: CategoryCreateTx) {}

  async exec(data: CreateCategory): Promise<CategoryRelationEntity> {
    const { dataToCreate, session } = data;
    console.log("output_log: data to create =>>>", dataToCreate);

    const { canCreateCategory } = createCategoryAbility(session);

    if (!canCreateCategory()) {
      throw new ForbiddenError();
    }

    return await this.categoryCreateTx.createCategoryComplexible(dataToCreate);
  }
}

export const createCategoryComplexibleUseCase =
  new CreateCategoryComplexibleUseCase(categoryCreateTx);
