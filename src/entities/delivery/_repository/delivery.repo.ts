import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { DeliveryEntity } from "../_domain/delivery.types";
import {
  DeliveryBindToOrderDTO,
  DeliveryCreateDTO,
  DeliveryGetByOrderDTO,
  DeliveryGetDTO,
  DeliveryUpdateDTO,
} from "../_domain/delivery.dto";
import { IDeliveryRepository } from "../_domain/repository.type";

@injectable()
export class DeliveryRepository implements IDeliveryRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: DeliveryGetDTO, db: Tx = this.db): Promise<DeliveryEntity> {
    const result = await db.delivery.findUniqueOrThrow({
      where: dto,
    });
    return result;
  }

  async getByOrder(
    dto: DeliveryGetByOrderDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const result = await db.delivery.findUniqueOrThrow({
      where: dto,
    });
    return result;
  }

  async getList(db: Tx = this.db): Promise<DeliveryEntity[]> {
    const deliveryList = await db.delivery.findMany();
    return deliveryList;
  }

  async create(
    dto: DeliveryCreateDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const { data } = dto;
    return await db.delivery.create({
      data,
    });
  }

  async update(
    dto: DeliveryUpdateDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const { selector, data } = dto;
    console.log("output_log:  =>>>", data, selector);

    return await db.delivery.update({
      where: selector,
      data,
    });
  }

  async bindToOrder(
    dto: DeliveryBindToOrderDTO,
    db: Tx = this.db,
  ): Promise<DeliveryEntity> {
    const { selector, target } = dto;

    const { orderId } = target;

    return await db.delivery.update({
      where: selector,
      data: {
        order: {
          connect: {
            id: orderId,
          },
        },
      },
    });
  }
}
