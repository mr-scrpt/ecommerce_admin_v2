import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  CartCreateDTO,
  CartGetByUserDTO,
  CartGetDTO,
  CartRemoveByUserDTO,
  CartRemoveDTO,
} from "@/kernel/domain/cart/cart.dto";
import { ICartRepository } from "@/kernel/domain/cart/repository.type";
import { CartEntity } from "@/kernel/domain/cart/cart.type";

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

  async getRelation<T>(dto: CartGetDTO, db: Tx = this.db): Promise<T> {
    return db.cart.findUniqueOrThrow({
      where: dto,
      include: {
        cartRowList: true,
      },
    }) as T;
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
