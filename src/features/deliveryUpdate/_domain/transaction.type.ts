import { DeliveryEntity } from "@/entities/delivery";
import { DeliveryUpdateTxDTO } from "./types";

export abstract class IDeliveryUpdateTx {
  abstract update(dto: DeliveryUpdateTxDTO): Promise<DeliveryEntity>;
}
