import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { IStoreUpdateTx } from "../_domain/transaction.type";
import { StoreUpdateTxDTO } from "../_domain/types";
import { StoreEntity } from "@/kernel/domain/store/store.type";

@injectable()
export class StoreUpdateTx extends Transaction implements IStoreUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: IStoreRepository,
  ) {
    super(db);
  }

  async update(dto: StoreUpdateTxDTO): Promise<StoreEntity> {
    const { selector, storeData, settlementData } = dto;
    const { settlementRef } = settlementData;

    const action = async (tx: Tx) => {
      await this.storeRepo.update(
        {
          selector,
          data: storeData,
          relations: {
            settlementRef,
          },
        },
        tx,
      );

      return await this.storeRepo.get({ id: selector.id }, tx);
    };

    return await this.start(action);
  }
}
