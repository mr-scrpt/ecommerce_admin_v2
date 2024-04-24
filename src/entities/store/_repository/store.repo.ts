import { DBClient, Tx } from "@/shared/lib/db";
import { injectable } from "inversify";
import { StoreEntity, StoreToCreate, StoreToUpdate } from "../_domain/types";

@injectable()
export class StoreRepository {
  constructor(readonly db: DBClient) {}

  async getStore(storeId: string, db: Tx = this.db): Promise<StoreEntity> {
    return db.store.findUniqueOrThrow({
      where: {
        id: storeId,
      },
    });
  }

  async getStoreList(db: Tx = this.db): Promise<StoreEntity[]> {
    return db.store.findMany();
  }

  async createStore(
    store: StoreToCreate,
    db: Tx = this.db,
  ): Promise<StoreEntity> {
    return await db.store.create({
      data: store,
    });
  }

  async updateStore(
    targetId: string,
    storeData: Partial<StoreToUpdate>,
    db: Tx = this.db,
  ): Promise<StoreEntity> {
    return await db.store.update({
      where: { id: targetId },
      data: storeData,
    });
  }

  async removeStoreById(
    storeId: string,
    db: Tx = this.db,
  ): Promise<StoreEntity> {
    return await db.store.delete({ where: { id: storeId } });
  }
}
