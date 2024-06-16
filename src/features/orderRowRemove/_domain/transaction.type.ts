import { OrderEntity } from "@/entities/order";
import { OrderRowRemoveTxDTO } from "./types";

export abstract class IOrderRowRemoveTx {
  abstract remove(dto: OrderRowRemoveTxDTO): Promise<OrderEntity>;
}
