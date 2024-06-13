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
  constructor(private readonly db: DBClient) {}

  async get(dto: CartGetDTO, db: Tx = this.db): Promise<CartEntity> {
    return db.cart.findUniqueOrThrow({
      where: dto,
    });
  }

  async getByUser(
    dto: CartGetByUserDTO,
    db: Tx = this.db,
  ): Promise<CartEntity> {
    return db.cart.findUniqueOrThrow({
      where: dto,
    });
  }

  async getRelation(
    dto: CartGetDTO,
    db: Tx = this.db,
  ): Promise<CartRelationEntity> {
    return db.cart.findUniqueOrThrow({
      where: dto,
      include: {
        cartRowList: true,
      },
    });
  }

  async getList(db: Tx = this.db): Promise<CartEntity[]> {
    return db.cart.findMany();
  }

  async create(dto: CartCreateDTO, db: Tx = this.db): Promise<CartEntity> {
    const { data } = dto;

    return await db.cart.create({ data });
  }

  async remove(dto: CartRemoveDTO, db: Tx = this.db): Promise<CartEntity> {
    const { selector } = dto;
    return await db.cart.delete({ where: selector });
  }

  async removeByUserId(
    dto: CartRemoveByUserDTO,
    db: Tx = this.db,
  ): Promise<CartEntity> {
    const { selector } = dto;
    return await db.cart.delete({ where: selector });
  }
}
