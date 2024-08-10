import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  CartRowUpdateDTO,
  CartRowCreateDTO,
  CartRowGetByProductDTO,
  CartRowRemoveDTO,
} from "../../../kernel/domain/cart/cartRow.dto";
import { CartRowEntity } from "@/kernel/domain/cart/cartRow.type";

@injectable()
export class CartRowRepository {
  constructor(private readonly db: DBClient) {}

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
    dto: CartRowUpdateDTO,
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
    const { data, target } = dto;
    return await db.cartRow.create({
      data: {
        ...data,
        cartId: target.cartId,
      },
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
