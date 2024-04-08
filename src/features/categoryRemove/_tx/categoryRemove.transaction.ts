import { CategoryEntity, CategoryId } from "@/entities/category";
import { CategoryRepository } from "@/entities/category/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { injectable } from "inversify";

@injectable()
export class CategoryRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
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
