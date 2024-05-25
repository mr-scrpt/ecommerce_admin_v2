import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  DeliveryEntity,
  DeliveryToCreate,
  DeliveryToUpdate,
} from "../_domain/delivery.types";

@injectable()
export class DeliveryRepository {
  constructor(readonly db: DBClient) {}

  async getDelivery(
    deliveryId: string,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const result = await db.delivery.findUniqueOrThrow({
      where: {
        id: deliveryId,
      },
    });
    return result;
  }

  async getDeliveryByOrderId(
    deliveryId: string,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const result = await db.delivery.findUniqueOrThrow({
      where: {
        orderId: deliveryId,
      },
    });
    return result;
  }

  async getDeliveryList(db: Tx = this.db): Promise<DeliveryEntity[]> {
    const deliveryList = await db.delivery.findMany();
    return deliveryList;
  }

  async createDelivery(
    data: DeliveryToCreate,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    return await db.delivery.create({
      data,
    });
  }

  async updateDelivery(
    deliveryId: string,
    data: Partial<DeliveryToUpdate>,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    return await db.delivery.update({
      where: {
        id: deliveryId,
      },
      data,
    });
  }
}
