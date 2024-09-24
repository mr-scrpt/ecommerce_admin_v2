import { OrderRelationEntity } from "@/entities/order/_domain/order/order.types";
import { OrderReceiverUpdateTxDTO } from "./types";

export abstract class IOrderReceiverUpdateTx {
  abstract update(dto: OrderReceiverUpdateTxDTO): Promise<OrderRelationEntity>;
}
