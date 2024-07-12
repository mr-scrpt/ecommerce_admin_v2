import { injectable } from "inversify";
import { OrderStatusUpdateTxPayload } from "../_domain/types";
import { IOrderStatusUpdateTx } from "../_domain/transaction.type";
import { Order } from "@/kernel/domain/order/order.type";

@injectable()
export class OrderStatusUpdateService {
  constructor(private readonly orderStatusUpdateTx: IOrderStatusUpdateTx) {}

  async execute(payload: OrderStatusUpdateTxPayload): Promise<Order> {
    return this.orderStatusUpdateTx.update(payload);
  }
}
