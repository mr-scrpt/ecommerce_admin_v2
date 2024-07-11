import {
  OrderCreateEmptyDTO,
  OrderGetByConsumerDTO,
  OrderGetDTO,
  OrderUpdateDTO,
} from "@/kernel/domain/order/order.dto";
import { OrderEntity } from "@/kernel/domain/order/order.type";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { SORTING_ORDER_DEFAULT } from "@/shared/config/constant";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: OrderGetDTO, db: Tx = this.db): Promise<OrderEntity> {
    const result = await db.order.findUniqueOrThrow({
      where: dto,
    });

    return result;
  }

  async getWithRelation<T>(dto: OrderGetDTO, db: Tx = this.db): Promise<T> {
    const result = await db.order.findUniqueOrThrow({
      where: dto,
      include: {
        orderRowList: {
          orderBy: {
            productName: SORTING_ORDER_DEFAULT,
          },
        },
        // delivery: true,
        delivery: {
          include: {
            address: true,
          },
        },
        // delivery: {
        //   select: {
        //     id: true,
        //   },
        // },
      },
    });
    console.log("output_log: with relation =>>>", result);

    return result as T;
  }

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

  // async updateStatus(
  //   dto: OrderUpdateDTO,
  //   data: Partial<OrderToUpdateStatus>,
  //   db: Tx = this.db,
  // ): Promise<OrderEntity> {
  //   return await db.order.update({
  //     where: {
  //       id: orderId,
  //     },
  //     data,
  //   });
  // }

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
