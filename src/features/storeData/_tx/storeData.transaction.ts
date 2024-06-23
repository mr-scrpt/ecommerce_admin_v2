import { ISettlementRepository } from "@/entities/settlement/server";
import { StoreWithSettlementName } from "@/entities/store";
import { IStoreRepository } from "@/entities/store/server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class StoreDataTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: IStoreRepository,
    private readonly settlementRepo: ISettlementRepository,
  ) {
    super(db);
  }

  async getStoreListWithSettlement(): Promise<Array<StoreWithSettlementName>> {
    const action = async (tx: Tx) => {
      const storeListResult: Array<StoreWithSettlementName> = [];
      const storeList = await this.storeRepo.getList();

      for await (const store of storeList) {
        const settlement = await this.settlementRepo.getByRef(
          { ref: store.settlementRef },
          tx,
        );

        storeListResult.push({
          ...store,
          settlementName: settlement.description,
        });
      }

      return storeListResult;
    };

    return await this.start(action);
  }

  async getStoreWithSettlementNameListBySettlement(
    settlement: string,
  ): Promise<Array<StoreWithSettlementName>> {
    const action = async (tx: Tx) => {
      const storeListResult: Array<StoreWithSettlementName> = [];
      const storeList = await this.storeRepo.getListBySettlement(
        settlement,
        tx,
      );

      for await (const store of storeList) {
        const settlement = await this.settlementRepo.getSettlement(
          store.settlementRef,
          tx,
        );

        storeListResult.push({
          ...store,
          settlementName: settlement.description,
        });
      }

      return storeListResult;
    };

    return await this.start(action);
  }
}
