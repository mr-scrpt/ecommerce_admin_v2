import { OrderEntity } from "@/entities/order";
import { OrderRowUpdateTxDTO } from "./types";

export abstract class IOrderRowUpdateTx {
  abstract update(dto: OrderRowUpdateTxDTO): Promise<OrderEntity>;
}
