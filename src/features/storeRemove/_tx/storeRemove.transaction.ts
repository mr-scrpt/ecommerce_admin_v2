import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { StoreEntity } from "@/kernel/domain/store/store.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { StoreRemoveTxDTO } from "../_domain/types";

@injectable()
export class StoreRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: IStoreRepository,
  ) {
    super(db);
  }

  async remove(dto: StoreRemoveTxDTO): Promise<StoreEntity> {
    const action = async (tx: Tx) => {
      return await this.storeRepo.remove(dto, tx);
    };

    return await this.start(action);
  }
}
