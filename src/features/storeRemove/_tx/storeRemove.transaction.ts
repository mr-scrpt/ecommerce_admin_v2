import { StoreEntity } from "@/entities/store";
import { StoreRepository } from "@/entities/store/server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { injectable } from "inversify";

@injectable()
export class StoreRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly categoryRepo: StoreRepository,
  ) {
    super(dbClient);
  }

  async removeStoreById(categoryId: string): Promise<StoreEntity> {
    const action = async (tx: Tx) => {
      return await this.categoryRepo.removeStoreById(categoryId, tx);
    };

    return await this.start(action);
  }
}
