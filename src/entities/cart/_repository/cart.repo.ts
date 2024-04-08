import { DBClient, Tx } from "@/shared/lib/db";
import { injectable } from "inversify";
import {
  CartEntity,
  CartId,
  CartRelationEntity,
  CartToAddProduct,
  CartToCreate,
} from "../_domain/types";

@injectable()
export class CartRepository {
  constructor(readonly db: DBClient) {}

  async getCartWithRelation(
    cartId: CartId,
    db: Tx = this.db,
  ): Promise<CartRelationEntity> {
    return db.cart.findUniqueOrThrow({
      where: {
        id: cartId,
      },
      include: {
        cartRowList: true,
      },
    });
  }

  async getCartWithRelationByUserId(
    userId: CartId,
    db: Tx = this.db,
  ): Promise<CartRelationEntity> {
    const result = await db.cart.findUniqueOrThrow({
      where: {
        userId: userId,
      },
      include: {
        cartRowList: true,
      },
    });
    return result;
  }

  async getCartList(db: Tx = this.db): Promise<CartEntity[]> {
    return db.cart.findMany();
  }

  async createCart(cart: CartToCreate, db: Tx = this.db): Promise<CartEntity> {
    return await db.cart.create({
      data: cart,
    });
  }

  async addCartProduct(data: CartToAddProduct): Promise<CartEntity> {
    const { id, productId } = data;
    return await this.db.cart.update({
      where: {
        id,
      },
      data: {
        cartRowList: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async removeCartById(cartId: CartId, db: Tx = this.db): Promise<CartEntity> {
    return await db.cart.delete({ where: { id: cartId } });
  }

  async removeCartByUserId(
    userId: string,
    db: Tx = this.db,
  ): Promise<CartEntity> {
    return await db.cart.delete({ where: { userId } });
  }
}
