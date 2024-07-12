import { OrderEntity } from "@/kernel/domain/order/order.type";
import { OrderRowRemoveTxDTO } from "./types";

export abstract class IOrderRowRemoveTx {
  abstract remove(dto: OrderRowRemoveTxDTO): Promise<OrderEntity>;
}
