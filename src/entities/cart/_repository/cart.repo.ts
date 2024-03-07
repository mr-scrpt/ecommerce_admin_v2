import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  CartEntity,
  CartId,
  CartRelationEntity,
  CartToAddProduct,
  CartToCreate,
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

  async addProductCart(data: CartToAddProduct): Promise<CartEntity> {
    const { id, productId } = data;
    return await this.db.cart.update({
      where: {
        id,
      },
      data: {
        productList: {
          connect: {
            id: productId,
          },
        },
      },
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
