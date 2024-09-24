import { OrderRelation } from "@/entities/order";
import { injectable } from "inversify";
import { IOrderReceiverUpdateTx } from "../_domain/transaction.type";
import { OrderReceiverUpdateTxPayload } from "../_domain/types";

@injectable()
export class OrderReceiverUpdateService {
  constructor(private readonly orderReceiverUpdateTx: IOrderReceiverUpdateTx) {}

  async execute(payload: OrderReceiverUpdateTxPayload): Promise<OrderRelation> {
    return this.orderReceiverUpdateTx.update(payload);
  }
}
