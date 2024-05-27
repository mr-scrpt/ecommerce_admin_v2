import { CategoryEntity } from "@/entities/category";
import { CategoryRepository } from "@/entities/category/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryUpdateTxDTO } from "../_domain/types";

@injectable()
export class CategoryUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(db);
  }

  async execute(data: CategoryUpdateTxDTO): Promise<CategoryEntity> {
    const action = async (tx: Tx) => {
      const { categoryData, propertyData } = data;
      const { id: categoryId } = categoryData;
      const categoryUpdated = await this.categoryRepo.updateCategory(
        categoryId,
        categoryData,
        tx,
      );

      await this.categoryRepo.addCategoryPropertyList(
        {
          categoryId,
          propertyListId: propertyData,
        },
        tx,
      );

      return await this.categoryRepo.getCategory(categoryUpdated.id, tx);
    };

    return await this.start(action);
  }
}
