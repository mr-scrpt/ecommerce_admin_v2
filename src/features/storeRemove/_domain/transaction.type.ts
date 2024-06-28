import { StoreEntity } from "@/kernel/domain/store/store.type";
import { StoreRemoveTxDTO } from "./types";

export abstract class IStoreRemoveTx {
  abstract remove(dto: StoreRemoveTxDTO): Promise<StoreEntity>;
}
