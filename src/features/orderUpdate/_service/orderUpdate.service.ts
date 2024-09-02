import { injectable } from "inversify";
import { OrderUpdateTxPayload } from "../_domain/types";
import { IOrderUpdateTx } from "../_domain/transaction.type";
import { Order } from "@/kernel/domain/order/order.type";

@injectable()
export class OrderUpdateService {
  constructor(private readonly orderUpdateTx: IOrderUpdateTx) {}

  async execute(payload: OrderUpdateTxPayload): Promise<Order> {
    return this.orderUpdateTx.update(payload);
  }
}
