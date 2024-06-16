import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderEntity, OrderRelationEntity } from "../_domain/order.types";
import {
  OrderCreateEmptyDTO,
  OrderGetByConsumerDTO,
  OrderGetDTO,
  OrderUpdateDTO,
} from "../_domain/order.dto";
import { SORTING_ORDER_DEFAULT } from "@/shared/config/constant";
import { IOrderRepository } from "../_domain/repository.type";

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: OrderGetDTO, db: Tx = this.db): Promise<OrderEntity> {
    const result = await db.order.findUniqueOrThrow({
      where: dto,
    });
    return result;
  }

  async getWithRelation(
    dto: OrderGetDTO,
    db: Tx = this.db,
  ): Promise<OrderRelationEntity> {
    const result = await db.order.findUniqueOrThrow({
      where: dto,
      include: {
        orderRowList: {
          orderBy: {
            productName: SORTING_ORDER_DEFAULT,
          },
        },
        delivery: {
          select: {
            id: true,
          },
        },
      },
    });
    // result.orderRowList;

    return result;
  }

  // async getOrderOwner(
  //   dto: OrderGetByOwnerDTO,
  //   db: Tx = this.db,
  // ): Promise<OrderEntity> {
  //   const { ownerId } = dto;
  //   const result = await db.order.findUniqueOrThrow({
  //     where: {
  //       userId: ownerId,
  //     },
  //   });
  //   return result;
  // }

  async getListByConsumer(
    dto: OrderGetByConsumerDTO,
    db: Tx = this.db,
  ): Promise<OrderEntity[]> {
    const { consumerId: ownerId } = dto;
    const orderList = await db.order.findMany({
      where: {
        userId: ownerId,
      },
    });
    return orderList;
  }

  async getList(db: Tx = this.db): Promise<OrderEntity[]> {
    const orderList = await db.order.findMany();
    return orderList;
  }

  async createEmpty(
    dto: OrderCreateEmptyDTO,
    db: Tx = this.db,
  ): Promise<OrderEntity> {
    const { data } = dto;

    return await db.order.create({
      data,
    });
  }

  async updateStatus(
    orderId: OrderId,
    data: Partial<OrderToUpdateStatus>,
    db: Tx = this.db,
  ): Promise<OrderEntity> {
    return await db.order.update({
      where: {
        id: orderId,
      },
      data,
    });
  }

  // async updateTotalPrice(
  //   orderId: OrderId,
  //   totalPrice: number,
  //   db: Tx = this.db,
  // ): Promise<OrderEntity> {
  //   return await db.order.update({
  //     where: {
  //       id: orderId,
  //     },
  //     data: {
  //       priceTotal: totalPrice,
  //     },
  //   });
  // }
  //
  async update(dto: OrderUpdateDTO, db: Tx = this.db): Promise<OrderEntity> {
    const { selector, data } = dto;
    return await db.order.update({
      where: selector,
      data,
    });
  }
}
