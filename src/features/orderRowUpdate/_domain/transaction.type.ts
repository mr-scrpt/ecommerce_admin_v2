import { OrderEntity } from "@/kernel/domain/order/order.type";
import { OrderRowUpdateTxDTO } from "./types";

export abstract class IOrderRowUpdateTx {
  abstract update(dto: OrderRowUpdateTxDTO): Promise<OrderEntity>;
}
