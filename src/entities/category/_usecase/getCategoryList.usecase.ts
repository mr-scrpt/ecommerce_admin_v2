import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createCategoryAbility } from "../_domain/category.ability";
import { CategoryEntity } from "../_domain/types";
import { CategoryRepository } from "../_repository/category.repo";

type GetCategoryList = {
  session: SessionEntity;
};

@injectable()
export class GetCategoryListUseCase {
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
