import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { OrderEntity, OrderRelationEntity } from "../_domain/order.types";
import { OrderGetByOwnerDTO, OrderGetDTO } from "../_domain/order.dto";
import { SORTING_ORDER_DEFAULT } from "@/shared/config/constant";

@injectable()
export class OrderRepository {
  constructor(readonly db: DBClient) {}

  async getOrder(dto: OrderGetDTO, db: Tx = this.db): Promise<OrderEntity> {
    const result = await db.order.findUniqueOrThrow({
      where: dto,
    });
    return result;
  }

  async getOrderWithRelation(
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
      },
    });
    result.orderRowList;

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

  async getOrderListByOwner(
    dto: OrderGetByOwnerDTO,
    db: Tx = this.db,
  ): Promise<OrderEntity[]> {
    const { ownerId } = dto;
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
