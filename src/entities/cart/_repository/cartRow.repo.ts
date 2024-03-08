import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  CartRowEntity,
  CartRowGetByProductId,
  CartRowIncreaseQuantity,
  CartRowToAddProduct,
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

  async increaseQuantity(
    data: CartRowIncreaseQuantity,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { id, quantity } = data;
    return await db.cartRow.update({
      where: {
        id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }

  async addCartRowProduct(
    data: CartRowToAddProduct,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { cartId, productId, quantity } = data;
    return await db.cartRow.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
  }
}

export const cartRowRepository = new CartRowRepository(dbClient);
