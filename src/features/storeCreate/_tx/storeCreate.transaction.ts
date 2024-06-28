import { StoreEntity } from "@/entities/store";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { StoreCreateComplexible } from "../_domain/types";
import { StoreRepository } from "@/entities/store/server";
import { injectable } from "inversify";

@injectable()
export class StoreCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly storeRepo: StoreRepository,
  ) {
    super(db);
  }

  async createStoreComplexible(
    data: StoreCreateComplexible,
  ): Promise<StoreEntity> {
    const action = async (tx: Tx) => {
      const { storeId, storeData } = data;
      const storeCreated = await this.storeRepo.create(storeId, storeData, tx);

      // await this.storeRepo.addStorePropertyList(
      //   {
      //     storeId,
      //     propertyListId: propertyListData,
      //   },
      //   tx,
      // );

      return await this.storeRepo.get(storeCreated.id, tx);
    };

    return await this.start(action);
  }
}
