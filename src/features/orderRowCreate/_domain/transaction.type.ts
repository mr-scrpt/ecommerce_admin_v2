import { OrderEntity } from "@/entities/order";
import { Transaction } from "@/shared/lib/db/db";
import { OrderRowCreateTxDTO } from "../_domain/types";

export abstract class IOrderRowCreateTx extends Transaction {
  abstract create(data: OrderRowCreateTxDTO): Promise<OrderEntity>;
}
