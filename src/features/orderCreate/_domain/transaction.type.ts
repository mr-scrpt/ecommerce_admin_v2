import { OrderEntity } from "@/entities/order";
import { Transaction } from "@/shared/lib/db/db";
import { OrderEmptyCreateTxDTO } from "../_domain/types";

export abstract class IOrderCreateTx extends Transaction {
  abstract createEmpty(dto: OrderEmptyCreateTxDTO): Promise<OrderEntity>;
}
