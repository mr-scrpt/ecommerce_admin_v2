import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  CartEntity,
  CartId,
  CartRelationEntity,
  CartToCreate,
  CartToUpdate,
} from "../_domain/types";

export class CartRepository {
  constructor(readonly db: DbClient) {}

  // async getCart(cartId: CartId, db: Tx = this.db): Promise<CartEntity> {
  //   return db.cart.findUniqueOrThrow({
  //     where: {
  //       id: cartId,
  //     },
  //   });
  // }

  async getCartWithRelation(
    cartId: CartId,
    db: Tx = this.db,
  ): Promise<CartRelationEntity> {
    return db.cart.findUniqueOrThrow({
      where: {
        id: cartId,
      },
      include: {
        productList: true,
      },
    });
  }

  // async getCartBySlug(slug: string, db: Tx = this.db): Promise<CartEntity> {
  //   return db.cart.findUniqueOrThrow({
  //     where: {
  //       slug,
  //     },
  //   });
  // }

  async getCartList(db: Tx = this.db): Promise<CartEntity[]> {
    return db.cart.findMany();
  }

  async createCart(cart: CartToCreate, db: Tx = this.db): Promise<CartEntity> {
    return await db.cart.create({
      data: cart,
    });
  }

  // async addCategoryList(
  //   data: CartAddCategoryList,
  //   db: Tx = this.db,
  // ): Promise<CartEntity> {
  //   const { cartId, categoryListId } = data;
  //   return await db.cart.update({
  //     where: {
  //       id: cartId,
  //     },
  //     data: {
  //       categoryList: {
  //         connect: categoryListId,
  //       },
  //     },
  //   });
  // }
  //
  // async updateCart(
  //   targetId: CartId,
  //   cart: CartToUpdate,
  //   db: Tx = this.db,
  // ): Promise<CartEntity> {
  //   return await db.cart.update({
  //     where: { id: targetId },
  //     data: {
  //       ...cart,
  //       categoryList: { set: [...cart.categoryList] },
  //       propertyItemListSelected: {
  //         set: [...cart.propertyItemListSelected],
  //       },
  //     },
  //   });
  // }

  async removeCartById(cartId: CartId, db: Tx = this.db): Promise<CartEntity> {
    return await db.cart.delete({ where: { id: cartId } });
  }
}

export const cartRepository = new CartRepository(dbClient);
