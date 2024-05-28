import { DBClient, Tx } from "@/shared/lib/db/db";
import { CartRowEntity } from "../_domain/types";
import { injectable } from "inversify";
import {
  CartRowAddProductDTO,
  CartRowChangeQuantityDTO,
  CartRowGetByProductDTO,
  CartRowRemoveDTO,
  CartRowRemoveProductDTO,
} from "../_domain/cartRow.dto";

@injectable()
export class CartRowRepository {
  constructor(readonly db: DBClient) {}

  async getCartRowByProductId(
    dto: CartRowGetByProductDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity | null> {
    const { cartId, productId } = dto;
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
    dto: CartRowChangeQuantityDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { id, quantity } = dto;
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
    dto: CartRowAddProductDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { cartId, productId } = dto;
    return await db.cartRow.create({
      data: {
        cartId,
        productId,
        quantity: 1,
      },
    });
  }

  async removeCartRowProduct(
    data: CartRowRemoveProductDTO,
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

  async removeCartRowAll(
    dto: CartRowRemoveDTO,
    db: Tx = this.db,
  ): Promise<void> {
    const { cartId } = dto;
    await db.cartRow.deleteMany({
      where: {
        cartId,
      },
    });
  }
}
