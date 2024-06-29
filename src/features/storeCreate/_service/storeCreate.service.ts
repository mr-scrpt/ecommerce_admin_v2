import { Store } from "@/kernel/domain/store/store.type";
import { injectable } from "inversify";
import { IStoreCreateTx } from "../_domain/transaction.type";
import { StoreCreateTxPayload } from "../_domain/types";

@injectable()
export class StoreCreateService {
  constructor(private readonly storeCreateTx: IStoreCreateTx) {}

  async execute(payload: StoreCreateTxPayload): Promise<Store> {
    return await this.storeCreateTx.create(payload);
  }
}
