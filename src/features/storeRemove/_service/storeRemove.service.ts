import { injectable } from "inversify";
import { IStoreRemoveTx } from "../_domain/transaction.type";
import { StoreRemoveTxPayload } from "../_domain/types";
import { Store } from "@/kernel/domain/store/store.type";

@injectable()
export class StoreRemoveService {
  constructor(private readonly storeRemoveTx: IStoreRemoveTx) {}

  async execute(selector: StoreRemoveTxPayload): Promise<Store> {
    return this.storeRemoveTx.remove(selector);
  }
}
