import { injectable } from "inversify";
import { OrderRowUpdateTxPayload } from "../_domain/types";
import { IOrderRowUpdateTx } from "../_domain/transaction.type";
import { Order } from "@/kernel/domain/order/order.type";

@injectable()
export class OrderRowUpdateService {
  constructor(private readonly orderRowUpdateTx: IOrderRowUpdateTx) {}

  async execute(payload: OrderRowUpdateTxPayload): Promise<Order> {
    return this.orderRowUpdateTx.update(payload);
  }
}
