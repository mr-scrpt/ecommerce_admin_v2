import { DBClient, Tx, dbClient } from "@/shared/lib/db/db";
import {
  OrderEntity,
  OrderId,
  OrderRelationEntity,
  OrderToCreate,
  OrderToUpdateStatus,
} from "../_domain/order.types";
import { injectable } from "inversify";

@injectable()
export class OrderRepository {
  constructor(readonly db: DBClient) {}

  async getOrder(orderId: OrderId, db: Tx = this.db): Promise<OrderEntity> {
    const result = await db.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
    });
    return result;
  }

  async getOrderWithRelation(
    orderId: OrderId,
    db: Tx = this.db,
  ): Promise<OrderRelationEntity> {
    const result = await db.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
      include: {
        orderRowList: {
          orderBy: {
            productName: "asc", // или 'desc' для сортировки по убыванию
          },
        },
      },
    });
    result.orderRowList;

    return result;
  }

  async getOrderOwner(orderId: OrderId, db: Tx = this.db): Promise<string> {
    const result = await db.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
    });
    return result.userId;
  }

  async getOrderOwnerList(
    ownerId: string,
    db: Tx = this.db,
  ): Promise<OrderEntity[]> {
    const orderList = await db.order.findMany({
      where: {
        userId: ownerId,
      },
    });
    return orderList;
  }

  async getOrderList(db: Tx = this.db): Promise<OrderEntity[]> {
    const orderList = await db.order.findMany();
    return orderList;
  }

  async createOrder(
    data: OrderToCreate,
    db: Tx = this.db,
  ): Promise<OrderEntity> {
    console.log("output_log: order =>>>", data);
    return await db.order.create({
      data,
    });
  }

  async updateOrderStatus(
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

  async updateTotalPrice(
    orderId: OrderId,
    totalPrice: number,
    db: Tx = this.db,
  ): Promise<OrderEntity> {
    return await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        priceTotal: totalPrice,
      },
    });
  }
}
