import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  DeliveryBindToOrderDTO,
  DeliveryCreateDTO,
  DeliveryGetByOrderDTO,
  DeliveryGetDTO,
  DeliveryUpdateDTO,
} from "@/kernel/domain/delivery/delivery.dto";
import { IDeliveryRepository } from "@/kernel/domain/delivery/repository.type";
import { DeliveryEntity } from "@/kernel/domain/delivery/delivery.type";
import { DeliveryRelationEntity } from "../_domain/delivery.types";

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
      include: {
        settlement: true,
      },
    });
    return result;
  }

  async getWithRelationsByOrder<T>(
    dto: DeliveryGetByOrderDTO,
    db: Tx = this.db,
  ): Promise<T> {
    const result = await db.delivery.findUniqueOrThrow({
      where: dto,
      include: {
        settlement: true,
        deliveryType: true,
      },
    });
    return result as unknown as T;
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
