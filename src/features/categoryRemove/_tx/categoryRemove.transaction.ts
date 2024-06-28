import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CategoryRemoveTxDTO } from "../_domain/types";
import { ICategoryRemoveTx } from "../_domain/transaction.type";
import { CategoryEntity } from "@/kernel/domain/category/category.type";
import { ICategoryRepository } from "@/kernel/domain/category/repository.type";

@injectable()
export class CategoryRemoveTx extends Transaction implements ICategoryRemoveTx {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: ICategoryRepository,
  ) {
    super(db);
  }

  async remove(dto: CategoryRemoveTxDTO): Promise<CategoryEntity> {
    const action = async (tx: Tx) => {
      return await this.categoryRepo.remove(dto, tx);
    };

    return await this.start(action);
  }
}
