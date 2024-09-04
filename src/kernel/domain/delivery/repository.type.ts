import { Tx } from "@/shared/lib/db/db";
import {
  DeliveryBindToOrderDTO,
  DeliveryCreateDTO,
  DeliveryGetByOrderDTO,
  DeliveryGetDTO,
  DeliveryUpdateDTO,
} from "./delivery.dto";
import { DeliveryEntity } from "./delivery.type";
import { DeliveryTypeEntity } from "./deliveryType.type";

export abstract class IDeliveryRepository {
  abstract get(dto: DeliveryGetDTO, db?: Tx): Promise<DeliveryEntity>;

  abstract getByOrder(
    dto: DeliveryGetByOrderDTO,
    db?: Tx,
  ): Promise<DeliveryEntity>;

  abstract getWithRelationsByOrder<T>(
    dto: DeliveryGetByOrderDTO,
    db?: Tx,
  ): Promise<T>;

  abstract getList(db?: Tx): Promise<DeliveryEntity[]>;

  abstract create(dto: DeliveryCreateDTO, db?: Tx): Promise<DeliveryEntity>;

  abstract update(dto: DeliveryUpdateDTO, db?: Tx): Promise<DeliveryEntity>;

  abstract bindToOrder(
    dto: DeliveryBindToOrderDTO,
    db?: Tx,
  ): Promise<DeliveryEntity>;
}

export abstract class IDeliveryTypeRepository {
  abstract getList(db?: Tx): Promise<DeliveryTypeEntity[]>;
  // abstract getAvailableList(db?: Tx): Promise<DeliveryTypeEntity[]>;
}
