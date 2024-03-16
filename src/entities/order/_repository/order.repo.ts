import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import { OrderEntity, OrderId, OrderRelationEntity } from "../_domain/types";

export class OrderRepository {
  constructor(readonly db: DbClient) {}

  async getOrder(orderId: OrderId, db: Tx = this.db): Promise<OrderEntity> {
    const result = await db.order.findUniqueOrThrow({
      where: {
        id: orderId,
      },
    });
    return result;

    // const order = orderToEnumMap(result);
    // return order;
    // return {
    //   ...result,
    //   orderStatus: result.orderStatus as OrderStatusEnum,
    //   paymentStatus: result.paymentStatus as OrderPaymentStatusEnum,
    // };
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
        orderRowList: true,
      },
    });

    return result;
  }

  async getOrderList(db: Tx = this.db): Promise<OrderEntity[]> {
    return db.order.findMany();
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
