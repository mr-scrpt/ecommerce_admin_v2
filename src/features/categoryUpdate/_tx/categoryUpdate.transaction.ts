import {
  CategoryEntity,
  CategoryRelationEntity,
  CategoryRepository,
  categoryRepository,
} from "@/entities/category";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CategoryUpdateComplexible } from "../_domain/types";

export class CategoryUpdateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(dbClient);
  }

  async updateCategoryComplexible(
    data: CategoryUpdateComplexible,
  ): Promise<CategoryEntity> {
    const action = async (tx: Tx) => {
      const { categoryId, categoryData, optionListData } = data;
      const categoryUpdated = await this.categoryRepo.updateCategory(
        categoryId,
        categoryData,
        tx,
      );

      await this.categoryRepo.addCategoryOptionList(
        {
          categoryId,
          optionListId: optionListData,
        },
        tx,
      );

      return await this.categoryRepo.getCategory(categoryUpdated.id, tx);
    };
    //
    return await this.start(action);
  }
}

export const categoryUpdateTx = new CategoryUpdateTx(
  dbClient,
  categoryRepository,
);
