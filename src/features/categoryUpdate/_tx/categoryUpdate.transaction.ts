import {
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
  ): Promise<CategoryRelationEntity> {
    const action = async (tx: Tx) => {
    //   const { categoryData, productListData, optionListData } = data;
    //
    //   const categoryUpdated = await this.categoryRepo.updateCategory(
    //     categoryData,
    //     tx,
    //   );
    //
    //   await this.categoryRepo.addCategoryProductList(
    //     {
    //       categoryId: categoryUpdated.id,
    //       productListId: productListData,
    //     },
    //     tx,
    //   );
    //
    //   await this.categoryRepo.addCategoryOptionList(
    //     {
    //       categoryId: categoryUpdated.id,
    //       optionListId: optionListData,
    //     },
    //     tx,
    //   );
    //
    //   return await this.categoryRepo.getCategoryRelation(
    //     categoryUpdated.id,
    //     tx,
    //   );
    // };
    //
    return await this.start(action);
  }
}

export const categoryUpdateTx = new CategoryUpdateTx(
  dbClient,
  categoryRepository,
);
