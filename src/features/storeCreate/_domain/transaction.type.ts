import { StoreEntity } from "@/kernel/domain/store/store.type";
import { StoreCreateTxDTO } from "./types";

export abstract class IStoreCreateTx {
  abstract create(dto: StoreCreateTxDTO): Promise<StoreEntity>;
}
