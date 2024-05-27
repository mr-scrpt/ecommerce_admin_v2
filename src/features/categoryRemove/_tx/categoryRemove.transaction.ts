import { CategoryEntity, CategoryId } from "@/entities/category";
import { CategoryRepository } from "@/entities/category/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class CategoryRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(db);
  }

  async removeCategoryById(categoryId: CategoryId): Promise<CategoryEntity> {
    const action = async (tx: Tx) => {
      return await this.categoryRepo.removeCategoryById(categoryId, tx);
    };

    return await this.start(action);
  }

  async removeCategoryBySlug(categorySlug: string): Promise<CategoryEntity> {
    const action = async (tx: Tx) => {
      return await this.categoryRepo.removeCategoryBySlug(categorySlug, tx);
    };

    return await this.start(action);
  }
}
