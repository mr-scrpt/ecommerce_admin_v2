import { Store } from "@/kernel/domain/store/store.type";
import { injectable } from "inversify";
import { IStoreUpdateTx } from "../_domain/transaction.type";
import { StoreUpdateTxPayload } from "../_domain/types";

@injectable()
export class StoreUpdateService {
  constructor(private readonly storeUpdateTx: IStoreUpdateTx) {}

  async execute(payload: StoreUpdateTxPayload): Promise<Store> {
    return await this.storeUpdateTx.update(payload);
  }
}
