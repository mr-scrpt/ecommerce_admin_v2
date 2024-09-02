import { Transaction } from "@/shared/lib/db/db";
import { OrderRowCreateTxDTO } from "./types";
import { OrderEntity } from "@/kernel/domain/order/order.type";

export abstract class IOrderRowCreateTx extends Transaction {
  abstract create(data: OrderRowCreateTxDTO): Promise<OrderEntity>;
}
