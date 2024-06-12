import { Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  CartCreateDTO,
  CartGetByUserDTO,
  CartGetDTO,
  CartRemoveByUserDTO,
  CartRemoveDTO,
} from "./cart.dto";
import { CartEntity, CartRelationEntity } from "./cart.types";
import {
  CartRowUpdateDTO,
  CartRowCreateDTO,
  CartRowGetByProductDTO,
  CartRowRemoveDTO,
} from "./cartRow.dto";
import { CartRowEntity } from "./cartRow.types";

@injectable()
export abstract class ICartRepository {
  abstract get(dto: CartGetDTO, db?: Tx): Promise<CartEntity>;

  abstract getByUser(dto: CartGetByUserDTO, db?: Tx): Promise<CartEntity>;

  abstract getRelation(
    dto: CartGetDTO,
    db?: Tx,
  ): Promise<CartRelationEntity>;

  abstract getList(db?: Tx): Promise<CartEntity[]>;

  abstract create(dto: CartCreateDTO, db?: Tx): Promise<CartEntity>;

  abstract remove(dto: CartRemoveDTO, db?: Tx): Promise<CartEntity>;

  abstract removeByUserId(
    dto: CartRemoveByUserDTO,
    db?: Tx,
  ): Promise<CartEntity>;
}

@injectable()
export abstract class ICartRowRepository {
  abstract getCartRowByProduct(
    dto: CartRowGetByProductDTO,
    db?: Tx,
  ): Promise<CartRowEntity | null>;

  abstract updateCartRow(
    dto: CartRowUpdateDTO,
    db?: Tx,
  ): Promise<CartRowEntity>;

  abstract createCartRow(
    dto: CartRowCreateDTO,
    db?: Tx,
  ): Promise<CartRowEntity>;

  abstract removeCartRow(
    dto: CartRowRemoveDTO,
    db?: Tx,
  ): Promise<CartRowEntity>;
}
