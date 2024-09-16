import { Transaction } from "@/shared/lib/db/db";
import { OrderRowCreateTxDTO, OrderUpdateTxDTO } from "./types";
import { OrderEntity } from "@/kernel/domain/order/order.type";

export abstract class IOrderUpdateTx extends Transaction {
  abstract update(dto: OrderUpdateTxDTO): Promise<OrderEntity>;
}

export abstract class IOrderRowCreateTx extends Transaction {
  abstract create(data: OrderRowCreateTxDTO): Promise<OrderEntity>;
}
