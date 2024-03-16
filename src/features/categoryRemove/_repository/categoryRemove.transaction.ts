import { CategoryEntity, CategoryId } from "@/entities/category";
import {
  CategoryRepository,
  categoryRepository,
} from "@/entities/category/server";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class CategoryRemoveTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(dbClient);
  }

  async removeCategoryById(categoryId: CategoryId): Promise<CategoryEntity> {
    const action = async (tx: Tx) => {
      return await this.categoryRepo.removeCategoryById(categoryId, tx);
    };

    return await this.start(action);
  }
}

export const categoryRemoveTx = new CategoryRemoveTx(
  dbClient,
  categoryRepository,
);
