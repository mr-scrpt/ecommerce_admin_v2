import { Transaction } from "@/shared/lib/db/db";
import { OrderStatusUpdateTxDTO } from "./types";
import { OrderEntity } from "@/kernel/domain/order/order.type";

export abstract class IOrderStatusUpdateTx extends Transaction {
  abstract update(dto: OrderStatusUpdateTxDTO): Promise<OrderEntity>;
}
