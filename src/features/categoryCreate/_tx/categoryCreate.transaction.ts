import { CategoryEntity } from "@/entities/category";
import { ICategoryRepository } from "@/entities/category/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryCreateTxDTO } from "../_domain/types";
import { ICategoryCreateTx } from "../_domain/transaction.type";

@injectable()
export class CategoryCreateTx extends Transaction implements ICategoryCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: ICategoryRepository,
  ) {
    super(db);
  }

  async create(dto: CategoryCreateTxDTO): Promise<CategoryEntity> {
    const { categoryData, propertyData } = dto;
    const action = async (tx: Tx) => {
      const { id } = await this.categoryRepo.createCategory(
        { data: categoryData },
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
