import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryUpdateTxDTO } from "../_domain/types";
import { ICategoryUpdateTx } from "../_domain/transaction.type";
import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";

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
      await this.categoryRepo.update(
        {
          selector,
          data: categoryData,
        },
        tx,
      );

      await this.categoryRepo.bindToPropertyList(
        {
          target: selector,
          data: {
            propertyListId: propertyData,
          },
        },
        tx,
      );

      return await this.categoryRepo.get({ id: selector.id }, tx);
    };

    return await this.start(action);
  }
}
