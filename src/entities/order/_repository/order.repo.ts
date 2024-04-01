import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  OrderEntity,
  OrderId,
  OrderRelationEntity,
  OrderToUpdateStatus,
} from "../_domain/order.types";

export class OrderRepository {
  constructor(readonly db: DbClient) {}

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

  // async getOrderWithRelationByUserId(
  //   userId: OrderId,
  //   db: Tx = this.db,
  // ): Promise<OrderRelationEntity> {
  //   const result = await db.order.findUniqueOrThrow({
  //     where: {
  //       userId: userId,
  //     },
  //     include: {
  //       orderRowList: true,
  //     },
  //   });
  //   return result;
  // }

  // async getOrderBySlug(slug: string, db: Tx = this.db): Promise<OrderEntity> {
  //   return db.order.findUniqueOrThrow({
  //     where: {
  //       slug,
  //     },
  //   });
  // }

  // async createOrder(
  //   order: OrderToCreate,
  //   db: Tx = this.db,
  // ): Promise<OrderEntity> {
  //   return await db.order.create({
  //     data: order,
  //   });
  // }

  // async addOrderProduct(data: OrderToAddProduct): Promise<OrderEntity> {
  //   const { id, productId } = data;
  //   return await this.db.order.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       orderRowList: {
  //         connect: {
  //           id: productId,
  //         },
  //       },
  //     },
  //   });
  // }
  //
  // async addCategoryList(
  //   data: OrderAddCategoryList,
  //   db: Tx = this.db,
  // ): Promise<OrderEntity> {
  //   const { orderId, categoryListId } = data;
  //   return await db.order.update({
  //     where: {
  //       id: orderId,
  //     },
  //     data: {
  //       categoryList: {
  //         connect: categoryListId,
  //       },
  //     },
  //   });
  // }
  //
  // async updateOrder(
  //   targetId: OrderId,
  //   order: OrderToUpdate,
  //   db: Tx = this.db,
  // ): Promise<OrderEntity> {
  //   return await db.order.update({
  //     where: { id: targetId },
  //     data: {
  //       ...order,
  //       categoryList: { set: [...order.categoryList] },
  //       propertyItemListSelected: {
  //         set: [...order.propertyItemListSelected],
  //       },
  //     },
  //   });
  // }

  // async removeOrderById(
  //   orderId: OrderId,
  //   db: Tx = this.db,
  // ): Promise<OrderEntity> {
  //   return await db.order.delete({ where: { id: orderId } });
  // }
}

export const orderRepository = new OrderRepository(dbClient);
