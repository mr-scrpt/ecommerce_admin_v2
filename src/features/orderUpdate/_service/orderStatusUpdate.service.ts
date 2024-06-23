import { Order } from "@/entities/order";
import { injectable } from "inversify";
import { OrderStatusUpdateTxPayload } from "../_domain/types";
import { IOrderStatusUpdateTx } from "../_domain/transaction.type";

@injectable()
export class OrderStatusUpdateService {
  constructor(private readonly orderStatusUpdateTx: IOrderStatusUpdateTx) {}

  async execute(payload: OrderStatusUpdateTxPayload): Promise<Order> {
    payload.orderStatusData;
    return this.orderStatusUpdateTx.update(payload);
  }
}
