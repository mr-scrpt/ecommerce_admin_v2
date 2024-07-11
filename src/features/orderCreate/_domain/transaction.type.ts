import { Transaction } from "@/shared/lib/db/db";
import { OrderEmptyCreateTxDTO } from "../_domain/types";
import { OrderEntity } from "@/kernel/domain/order/order.type";

export abstract class IOrderCreateTx extends Transaction {
  abstract createEmpty(dto: OrderEmptyCreateTxDTO): Promise<OrderEntity>;
}
