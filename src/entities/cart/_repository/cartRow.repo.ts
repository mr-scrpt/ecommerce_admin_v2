import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  CartRowEntity,
  CartRowGetByProductId,
  CartRowChangeQuantity,
  CartRowToAddProduct,
  CartRowToRemoveProduct,
} from "../_domain/types";

export class CartRowRepository {
  constructor(readonly db: DbClient) {}

  // async getCart(cartId: CartId, db: Tx = this.db): Promise<CartEntity> {
  //   return db.cart.findUniqueOrThrow({
  //     where: {
  //       id: cartId,
  //     },
  //   });
  // }

  async getCartRowByProductId(
    data: CartRowGetByProductId,
    db: Tx = this.db,
  ): Promise<CartRowEntity | null> {
    const { cartId, productId } = data;
    return db.cartRow.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }

  // async increaseQuantity(
  //   data: CartRowChangeQuantity,
  //   db: Tx = this.db,
  // ): Promise<CartRowEntity> {
  //   const { id, quantity } = data;
  //   return await db.cartRow.update({
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
  //   data: CartRowChangeQuantity,
  //   db: Tx = this.db,
  // ): Promise<CartRowEntity> {
  //   console.log("output_log: decreaseQuantity =>>>", data);
  //   const { id, quantity } = data;
  //   return await db.cartRow.update({
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

  async changeCartRowProductQuantity(
    data: CartRowChangeQuantity,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { id, quantity } = data;
    return await db.cartRow.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });
  }

  async addCartRowProduct(
    data: CartRowToAddProduct,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { cartId, productId } = data;
    return await db.cartRow.create({
      data: {
        cartId,
        productId,
        quantity: 1,
      },
    });
  }

  async removeCartRowProduct(
    data: CartRowToRemoveProduct,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { cartId, productId } = data;
    return await db.cartRow.delete({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }
}

export const cartRowRepository = new CartRowRepository(dbClient);
