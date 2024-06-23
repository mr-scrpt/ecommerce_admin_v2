import { DeliveryEntity } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryUpdateTxDTO } from "./types";

export abstract class IDeliveryUpdateTx {
  abstract update(dto: DeliveryUpdateTxDTO): Promise<DeliveryEntity>;
}
