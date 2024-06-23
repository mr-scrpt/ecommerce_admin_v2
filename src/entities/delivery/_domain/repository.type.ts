import { Tx } from "@/shared/lib/db/db";
import {
  DeliveryBindToOrderDTO,
  DeliveryCreateDTO,
  DeliveryGetByOrderDTO,
  DeliveryGetDTO,
  DeliveryUpdateDTO,
} from "../_domain/delivery.dto";
import { DeliveryEntity } from "../_domain/delivery.types";

export abstract class IDeliveryRepository {
  abstract get(dto: DeliveryGetDTO, db?: Tx): Promise<DeliveryEntity>;

  abstract getByOrder(
    dto: DeliveryGetByOrderDTO,
    db?: Tx,
  ): Promise<DeliveryEntity>;

  abstract getList(db?: Tx): Promise<DeliveryEntity[]>;

  abstract create(dto: DeliveryCreateDTO, db?: Tx): Promise<DeliveryEntity>;

  abstract update(dto: DeliveryUpdateDTO, db?: Tx): Promise<DeliveryEntity>;

  abstract bindToOrder(
    dto: DeliveryBindToOrderDTO,
    db?: Tx,
  ): Promise<DeliveryEntity>;
}
