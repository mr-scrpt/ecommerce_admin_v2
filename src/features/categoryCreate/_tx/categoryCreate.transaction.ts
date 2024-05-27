import { CategoryEntity } from "@/entities/category";
import { CategoryRepository } from "@/entities/category/server";
import { CategoryUpdateTxDTO } from "@/features/categoryUpdate/_domain/types";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class CategoryCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: CategoryRepository,
  ) {
    super(db);
  }

  async execute(data: CategoryUpdateTxDTO): Promise<CategoryEntity> {
    const { categoryData, propertyData } = data;
    const action = async (tx: Tx) => {
      const categoryCreated = await this.categoryRepo.createCategory(
        categoryData,
        tx,
      );

      await this.categoryRepo.addCategoryPropertyList(
        {
          categoryId: categoryCreated.id,
          propertyListId: propertyData,
        },
        tx,
      );

      return await this.categoryRepo.getCategory(categoryCreated.id, tx);
    };

    return await this.start(action);
  }
}
