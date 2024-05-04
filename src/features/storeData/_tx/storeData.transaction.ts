import { StoreWithSettlementName } from "@/entities/store";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { StoreRepository } from "@/entities/store/server";
import { injectable } from "inversify";
import { SettlementRepository } from "@/entities/settlement/_repository/settlement.repo";

@injectable()
export class StoreDataTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: StoreRepository,
    private readonly settlementRepo: SettlementRepository,
  ) {
    super(dbClient);
  }

  async getStoreWithSettlementNameList(): Promise<
    Array<StoreWithSettlementName>
  > {
    const action = async (tx: Tx) => {
      const storeListResult: Array<StoreWithSettlementName> = [];
      const storeList = await this.storeRepo.getStoreList();

      for await (const store of storeList) {
        const settlement = await this.settlementRepo.getSettlement(
          store.settlement,
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
      const storeList = await this.storeRepo.getStoreListBySettlement(
        settlement,
        tx,
      );

      for await (const store of storeList) {
        const settlement = await this.settlementRepo.getSettlement(
          store.settlement,
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
