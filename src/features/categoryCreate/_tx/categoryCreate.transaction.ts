import { CategoryEntity } from "@/entities/category";
import { DBClient, Tx, Transaction } from "@/shared/lib/db/db";
import { CategoryCreateComplexible } from "../_domain/types";
import { CategoryRepository } from "@/entities/category/server";
import { injectable } from "inversify";

@injectable()
export class CategoryCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(db);
  }

  async createCategoryComplexible(
    data: CategoryCreateComplexible,
  ): Promise<CategoryEntity> {
    const { categoryData, propertyListData } = data;
    const action = async (tx: Tx) => {
      const categoryCreated = await this.categoryRepo.createCategory(
        categoryData,
        tx,
      );

      await this.categoryRepo.addCategoryPropertyList(
        {
          categoryId: categoryCreated.id,
          propertyListId: propertyListData,
        },
        tx,
      );

      return await this.categoryRepo.getCategory(categoryCreated.id, tx);
    };

    return await this.start(action);
  }
}
