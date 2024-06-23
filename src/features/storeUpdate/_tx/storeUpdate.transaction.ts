import { StoreEntity } from "@/entities/store";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { StoreUpdateComplexible } from "../_domain/types";
import { StoreRepository } from "@/entities/store/server";
import { injectable } from "inversify";

@injectable()
export class StoreUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: StoreRepository,
  ) {
    super(db);
  }

  async updateStoreComplexible(
    data: StoreUpdateComplexible,
  ): Promise<StoreEntity> {
    const action = async (tx: Tx) => {
      const { storeId, storeData } = data;
      const storeUpdated = await this.storeRepo.update(
        storeId,
        storeData,
        tx,
      );

      // await this.storeRepo.addStorePropertyList(
      //   {
      //     storeId,
      //     propertyListId: propertyListData,
      //   },
      //   tx,
      // );

      return await this.storeRepo.get(storeUpdated.id, tx);
    };

    return await this.start(action);
  }
}
