import { CategoryEntity } from "@/entities/category";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CategoryUpdateComplexible } from "../_domain/types";
import { CategoryRepository } from "@/entities/category/server";
import { injectable } from "inversify";

@injectable()
export class CategoryUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
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

    return await this.start(action);
  }
}
