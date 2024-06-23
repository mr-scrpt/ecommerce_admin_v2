import { StoreEntity } from "@/entities/store";
import { StoreRepository } from "@/entities/store/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class StoreRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: StoreRepository,
  ) {
    super(db);
  }

  async removeStoreById(categoryId: string): Promise<StoreEntity> {
    const action = async (tx: Tx) => {
      return await this.categoryRepo.remove(categoryId, tx);
    };

    return await this.start(action);
  }
}
