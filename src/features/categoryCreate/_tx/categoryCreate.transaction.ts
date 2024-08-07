import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryCreateTxDTO } from "../_domain/types";
import { ICategoryCreateTx } from "../_domain/transaction.type";
import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";

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
      const { id } = await this.categoryRepo.create({ data: categoryData }, tx);

      await this.categoryRepo.bindToPropertyList(
        {
          target: { id },
          data: {
            propertyListId: propertyData,
          },
        },
        tx,
      );

      const res = await this.categoryRepo.get({ id }, tx);

      // TODO: implement monad
      // res.mapLeft((e) => {
      //
      //
      // })

      return res;
    };

    return await this.start(action);
  }
}
