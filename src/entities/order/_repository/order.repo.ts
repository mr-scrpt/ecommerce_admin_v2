import {
  OrderCreateEmptyWithReceiverDTO,
  OrderGetByConsumerDTO,
  OrderGetDTO,
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
        orderStatusState: true,
        orderStatusPayment: true,
      },
    });

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
    dto: OrderCreateEmptyWithReceiverDTO,
    db: Tx = this.db,
  ): Promise<OrderEntity> {
    const {
      data: { userId, receiverId, ...rest },
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
}
