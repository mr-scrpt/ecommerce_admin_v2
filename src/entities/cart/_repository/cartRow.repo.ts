import { DBClient, Tx } from "@/shared/lib/db/db";
import { CartRowEntity } from "../_domain/cartRow.types";
import { injectable } from "inversify";
import {
  CartRowChangeQuantityDTO,
  CartRowCreateDTO,
  CartRowGetByProductDTO,
  CartRowGetDTO,
  CartRowRemoveDTO,
} from "../_domain/cartRow.dto";

@injectable()
export class CartRowRepository {
  constructor(readonly db: DBClient) {}

  async getCartRowId(
    dto: CartRowGetDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity | null> {
    const { id } = dto;
    return db.cartRow.findUnique({
      where: {
        id,
      },
    });
  }

  async getCartRowByProduct(
    dto: CartRowGetByProductDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity | null> {
    const { cartId, productId } = dto;
    return db.cartRow.findUnique({
      where: {
        cartId_productId: { cartId, productId },
      },
    });
  }

  async updateCartRow(
    dto: CartRowChangeQuantityDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { selector, data } = dto;
    const { id } = selector;
    return await db.cartRow.update({
      where: {
        id,
      },
      data,
    });
  }

  async createCartRow(
    dto: CartRowCreateDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { data } = dto;
    return await db.cartRow.create({
      data,
    });
  }

  async removeCartRow(
    dto: CartRowRemoveDTO,
    db: Tx = this.db,
  ): Promise<CartRowEntity> {
    const { selector } = dto;

    return await db.cartRow.delete({
      where: {
        id: selector.id,
      },
    });
  }
}
