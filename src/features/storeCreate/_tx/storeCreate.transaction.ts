import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { StoreCreateTxDTO } from "../_domain/types";
import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { StoreEntity } from "@/kernel/domain/store/store.type";
import { IStoreCreateTx } from "../_domain/transaction.type";

@injectable()
export class StoreCreateTx extends Transaction implements IStoreCreateTx {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: IStoreRepository,
  ) {
    super(db);
  }

  async create(dto: StoreCreateTxDTO): Promise<StoreEntity> {
    const action = async (tx: Tx) => {
      const { storeData, settlementData } = dto;
      const { settlementRef } = settlementData;

      const { id } = await this.storeRepo.create(
        {
          data: storeData,
          relations: {
            settlementRef,
          },
        },
        tx,
      );

      return await this.storeRepo.get({ id }, tx);
    };

    return await this.start(action);
  }
}
