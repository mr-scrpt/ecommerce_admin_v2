import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { CartEntity, CartRelationEntity } from "../_domain/types";
import {
  CartAddProductDTO,
  CartCreateDTO,
  CartGetByUserDTO,
  CartGetDTO,
  CartRemoveByUserDTO,
  CartRemoveDTO,
} from "../_domain/cart.dto";

@injectable()
export class CartRepository {
  constructor(readonly db: DBClient) {}

  async getCartRelation(
    dto: CartGetDTO,
    db: Tx = this.db,
  ): Promise<CartRelationEntity> {
    const { cartId } = dto;
    return db.cart.findUniqueOrThrow({
      where: {
        id: cartId,
      },
      include: {
        cartRowList: true,
      },
    });
  }

  async getCartWithRelationByUser(
    dto: CartGetByUserDTO,
    db: Tx = this.db,
  ): Promise<CartRelationEntity> {
    const { userId } = dto;
    const result = await db.cart.findUniqueOrThrow({
      where: {
        userId,
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

  async createCart(dto: CartCreateDTO, db: Tx = this.db): Promise<CartEntity> {
    return await db.cart.create({
      data: dto,
    });
  }

  async addCartProduct(dto: CartAddProductDTO): Promise<CartEntity> {
    const { id, productId } = dto;
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

  async removeCartById(
    dto: CartRemoveDTO,
    db: Tx = this.db,
  ): Promise<CartEntity> {
    const { cartId } = dto;
    return await db.cart.delete({ where: { id: cartId } });
  }

  async removeCartByUserId(
    dto: CartRemoveByUserDTO,
    db: Tx = this.db,
  ): Promise<CartEntity> {
    const { userId } = dto;
    return await db.cart.delete({ where: { userId } });
  }
}
