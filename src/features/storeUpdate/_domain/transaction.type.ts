import { StoreEntity } from "@/kernel/domain/store/store.type";
import { StoreUpdateTxDTO } from "./types";

export abstract class IStoreUpdateTx {
  abstract update(dto: StoreUpdateTxDTO): Promise<StoreEntity>;
}
