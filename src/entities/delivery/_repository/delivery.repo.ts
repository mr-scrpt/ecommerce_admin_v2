import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { DeliveryEntity } from "../_domain/delivery.types";
import {
  DeliveryCreateDTO,
  DeliveryGetByOrderDTO,
  DeliveryGetDTO,
  DeliveryUpdateDTO,
} from "../_domain/delivery.dto";

@injectable()
export class DeliveryRepository {
  constructor(readonly db: DBClient) {}

  async getDelivery(
    dto: DeliveryGetDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const result = await db.delivery.findUniqueOrThrow({
      where: dto,
    });
    return result;
  }

  async getDeliveryByOrder(
    dto: DeliveryGetByOrderDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const { orderId } = dto;
    const result = await db.delivery.findUniqueOrThrow({
      where: {
        orderId,
      },
    });
    return result;
  }

  async getDeliveryList(db: Tx = this.db): Promise<DeliveryEntity[]> {
    const deliveryList = await db.delivery.findMany();
    return deliveryList;
  }

  async createDelivery(
    dto: DeliveryCreateDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    return await db.delivery.create({
      data: dto,
    });
  }

  async updateDelivery(
    dto: DeliveryUpdateDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    return await db.delivery.update({
      where: {
        id,
      },
      data,
    });
  }
}
