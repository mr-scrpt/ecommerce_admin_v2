import {
  CategoryEntity,
  CategoryRelationEntity,
  CategoryRepository,
  categoryRepository,
} from "@/entities/category";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { CategoryCreateComplexible } from "../_domain/types";

export class CategoryCreateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(dbClient);
  }

  async createCategoryComplexible(
    data: CategoryCreateComplexible,
  ): Promise<CategoryEntity> {
    const { categoryData, optionListData } = data;
    const action = async (tx: Tx) => {
      const categoryCreated = await this.categoryRepo.createCategory(
        categoryData,
        tx,
      );

      await this.categoryRepo.addCategoryOptionList(
        {
          categoryId: categoryCreated.id,
          optionListId: optionListData,
        },
        tx,
      );

      return await this.categoryRepo.getCategory(categoryCreated.id, tx);
    };

    return await this.start(action);
  }
}

export const categoryCreateTx = new CategoryCreateTx(
  dbClient,
  categoryRepository,
);
