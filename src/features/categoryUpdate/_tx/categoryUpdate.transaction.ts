import { CategoryEntity } from "@/entities/category";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CategoryUpdateComplexible } from "../_domain/types";
import {
  CategoryRepository,
  categoryRepository,
} from "@/entities/category/server";

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
      const { categoryId, categoryData, propertyListData } = data;
      const categoryUpdated = await this.categoryRepo.updateCategory(
        categoryId,
        categoryData,
        tx,
      );

      await this.categoryRepo.addCategoryPropertyList(
        {
          categoryId,
          propertyListId: propertyListData,
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
