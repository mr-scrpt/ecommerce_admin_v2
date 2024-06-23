import { OrderEntity } from "@/entities/order";
import { Transaction } from "@/shared/lib/db/db";
import { OrderStatusUpdateTxDTO } from "./types";

export abstract class IOrderStatusUpdateTx extends Transaction {
  abstract update(dto: OrderStatusUpdateTxDTO): Promise<OrderEntity>;
}
