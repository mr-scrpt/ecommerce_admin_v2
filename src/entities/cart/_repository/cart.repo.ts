import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  CartCreateDTO,
  CartGetByUserDTO,
  CartGetDTO,
  CartRemoveByUserDTO,
  CartRemoveDTO,
} from "../_domain/cart.dto";
import { CartEntity, CartRelationEntity } from "../_domain/cart.types";
import { ICartRepository } from "../_domain/repository.type";

@injectable()
export class CartRepository implements ICartRepository {
  constructor(readonly db: DBClient) {}

  async getCart(dto: CartGetDTO, db: Tx = this.db): Promise<CartEntity> {
    const { id } = dto;
    return db.cart.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async getCartByUser(
    dto: CartGetByUserDTO,
    db: Tx = this.db,
  ): Promise<CartEntity> {
    const { userId: id } = dto;
    return db.cart.findUniqueOrThrow({
      where: {
        userId: id,
      },
    });
  }

  async getCartRelation(
    dto: CartGetDTO,
    db: Tx = this.db,
  ): Promise<CartRelationEntity> {
    const { id } = dto;
    return db.cart.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        cartRowList: true,
      },
    });
  }

  async getCartList(db: Tx = this.db): Promise<CartEntity[]> {
    return db.cart.findMany();
  }

  async createCart(dto: CartCreateDTO, db: Tx = this.db): Promise<CartEntity> {
    const { data } = dto;

    return await db.cart.create({ data });
  }

  async removeCart(dto: CartRemoveDTO, db: Tx = this.db): Promise<CartEntity> {
    const {
      selector: { id: cartId },
    } = dto;
    return await db.cart.delete({ where: { id: cartId } });
  }

  async removeCartByUserId(
    dto: CartRemoveByUserDTO,
    db: Tx = this.db,
  ): Promise<CartEntity> {
    const {
      selector: { userId },
    } = dto;
    return await db.cart.delete({ where: { userId } });
  }
}
