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

  async update(dto: CategoryUpdateTxDTO): Promise<CategoryEntity> {
    const { selector, categoryData, propertyData } = dto;
    const { id } = selector;

    const action = async (tx: Tx) => {
      await this.categoryRepo.updateCategory(
        {
          selector: { id },
          data: categoryData,
        },
        tx,
      );

      await this.categoryRepo.bindCategoryPropertyList(
        {
          selector: { id },
          data: {
            propertyListId: propertyData,
          },
        },
        tx,
      );

      return await this.categoryRepo.getCategory({ id }, tx);
    };

    return await this.start(action);
  }
}
