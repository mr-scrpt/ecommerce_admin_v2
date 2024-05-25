import { DBClient, Tx, dbClient } from "@/shared/lib/db/db";
import {
  CartRowEntity,
  CartRowGetByProductId,
  CartRowChangeQuantity,
  CartRowToAddProduct,
  CartRowToRemoveProduct,
} from "../_domain/types";
import { injectable } from "inversify";

@injectable()
export class CartRowRepository {
  constructor(readonly db: DBClient) {}

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

  async removeCartRowAll(cartId: string, db: Tx = this.db): Promise<void> {
    await db.cartRow.deleteMany({
      where: {
        cartId,
      },
    });
  }
}
