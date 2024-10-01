import {
  OrderCreateEmptyWithReceiverDTO,
  OrderGetByConsumerDTO,
  OrderGetDTO,
  OrderReceiverUpdateDTO,
  OrderUpdateDTO,
} from "@/kernel/domain/order/order.dto";
import { OrderEntity } from "@/kernel/domain/order/order.type";
import { IOrderRepository } from "@/kernel/domain/order/repository.type";
import { DBClient, Tx } from "@/shared/lib/db/db";
import { ORDER_STATUS_PAYMENT, ORDER_STATUS_STATE } from "@prisma/client";
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
        orderRowList: true,
        delivery: {
          include: {
            address: true,
          },
        },
        receiver: true,
        orderStatusState: true,
        orderStatusPayment: true,
      },
    });

    return result as T;
  }

  async getListByConsumer<T>(
    dto: OrderGetByConsumerDTO,
    db: Tx = this.db,
  ): Promise<Array<T>> {
    const { consumerId: ownerId } = dto;
    const orderList = await db.order.findMany({
      where: {
        userId: ownerId,
      },
      include: {
        orderRowList: true,
        delivery: {
          include: {
            address: true,
          },
        },
        receiver: true,
        orderStatusState: true,
        orderStatusPayment: true,
      },
    });
    return orderList as Array<T>;
  }

  async getList(db: Tx = this.db): Promise<OrderEntity[]> {
    const orderList = await db.order.findMany();
    return orderList;
  }

  async getListWithRelation<T>(dto: OrderGetDTO, db: Tx = this.db): Promise<T> {
    const { id } = dto;
    const orderList = await db.order.findMany({
      where: {
        id,
      },
      include: {
        orderRowList: true,
        delivery: {
          include: {
            address: true,
          },
        },
        receiver: true,
        orderStatusState: true,
        orderStatusPayment: true,
      },
    });
    return orderList as T;
  }
  // async getListWithRelationByConsumer<T>(
  //   dto: OrderGetByConsumerDTO,
  //   db: Tx = this.db,
  // ): Promise<T> {
  //   const { consumerId } = dto;
  //   const orderList = await db.order.findMany({
  //     where: {
  //       userId: consumerId,
  //     },
  //     include: {
  //       orderRowList: true,
  //       delivery: {
  //         include: {
  //           address: true,
  //         },
  //       },
  //       receiver: true,
  //       orderStatusState: true,
  //       orderStatusPayment: true,
  //     },
  //   });
  //   return orderList as T;
  // }

  async createEmpty(
    dto: OrderCreateEmptyWithReceiverDTO,
    db: Tx = this.db,
  ): Promise<OrderEntity> {
    const {
      data: { receiverId, userId, ...rest },
    } = dto;
    return await db.order.create({
      data: {
        ...rest,
        user: {
          connect: { id: userId },
        },
        receiver: {
          connect: { id: receiverId },
        },
        orderStatusState: {
          connect: { status: ORDER_STATUS_STATE.TEMP },
        },
        orderStatusPayment: {
          connect: { status: ORDER_STATUS_PAYMENT.TEMP },
        },
      },
    });
  }

  async update(dto: OrderUpdateDTO, db: Tx = this.db): Promise<OrderEntity> {
    const { selector, data } = dto;
    return await db.order.update({
      where: selector,
      data,
    });
  }

  async bindReceiver(
    dto: OrderReceiverUpdateDTO,
    db: Tx = this.db,
  ): Promise<OrderEntity> {
    const { selector, data } = dto;
    return await db.order.update({
      where: selector,
      data,
    });
  }
}
