import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  OrderRowEntity,
  OrderRowGetByProductId,
  OrderRowChangeQuantity,
  OrderRowToAddProduct,
  OrderRowToRemoveProduct,
} from "../_domain/types";

export class OrderRowRepository {
  constructor(readonly db: DbClient) {}

  // async getOrder(orderId: OrderId, db: Tx = this.db): Promise<OrderEntity> {
  //   return db.order.findUniqueOrThrow({
  //     where: {
  //       id: orderId,
  //     },
  //   });
  // }

  async getOrderRowByProductId(
    data: OrderRowGetByProductId,
    db: Tx = this.db,
  ): Promise<OrderRowEntity | null> {
    const { orderId, productId } = data;
    return db.orderRow.findUnique({
      where: {
        orderId_productId: {
          orderId,
          productId,
        },
      },
    });
  }

  // async increaseQuantity(
  //   data: OrderRowChangeQuantity,
  //   db: Tx = this.db,
  // ): Promise<OrderRowEntity> {
  //   const { id, quantity } = data;
  //   return await db.orderRow.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       quantity: {
  //         increment: quantity,
  //       },
  //     },
  //   });
  // }
  //
  // async decreaseQuantity(
  //   data: OrderRowChangeQuantity,
  //   db: Tx = this.db,
  // ): Promise<OrderRowEntity> {
  //   console.log("output_log: decreaseQuantity =>>>", data);
  //   const { id, quantity } = data;
  //   return await db.orderRow.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       quantity: {
  //         decrement: quantity,
  //       },
  //     },
  //   });
  // }

  async changeOrderRowProductQuantity(
    data: OrderRowChangeQuantity,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const { id, quantity } = data;
    return await db.orderRow.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });
  }

  async addOrderRowProduct(
    data: OrderRowToAddProduct,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const { orderId, productId } = data;
    return await db.orderRow.create({
      data: {
        orderId,
        productId,
        quantity: 1,
      },
    });
  }

  async removeOrderRowProduct(
    data: OrderRowToRemoveProduct,
    db: Tx = this.db,
  ): Promise<OrderRowEntity> {
    const { orderId, productId } = data;
    return await db.orderRow.delete({
      where: {
        orderId_productId: {
          orderId,
          productId,
        },
      },
    });
  }
}

export const orderRowRepository = new OrderRowRepository(dbClient);
