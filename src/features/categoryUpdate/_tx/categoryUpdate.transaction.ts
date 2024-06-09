import { CategoryEntity } from "@/entities/category";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryUpdateTxDTO } from "../_domain/types";
import { ICategoryRepository } from "@/entities/category/server";
import { ICategoryUpdateTx } from "../_domain/transaction.type";

@injectable()
export class CategoryUpdateTx extends Transaction implements ICategoryUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: ICategoryRepository,
  ) {
    super(db);
  }

  async update(dto: CategoryUpdateTxDTO): Promise<CategoryEntity> {
    const { selector, categoryData, propertyData } = dto;

    const action = async (tx: Tx) => {
      await this.categoryRepo.updateCategory(
        {
          selector,
          data: categoryData,
        },
        tx,
      );

      await this.categoryRepo.bindCategoryPropertyList(
        {
          selector,
          data: {
            propertyListId: propertyData,
          },
        },
        tx,
      );

      return await this.categoryRepo.getCategory({ id: selector.id }, tx);
    };

    return await this.start(action);
  }
}
