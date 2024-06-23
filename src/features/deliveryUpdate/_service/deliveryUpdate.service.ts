import { injectable } from "inversify";
import { IDeliveryUpdateTx } from "../_domain/transaction.type";
import { DeliveryUpdateTxPayload } from "../_domain/types";
import { Delivery } from "@/kernel/domain/delivery/delivery.type";

@injectable()
export class DeliveryUpdateService {
  constructor(private readonly deliveryUpdateTx: IDeliveryUpdateTx) {}

  async execute(payload: DeliveryUpdateTxPayload): Promise<Delivery> {
    return await this.deliveryUpdateTx.update(payload);
  }
}
