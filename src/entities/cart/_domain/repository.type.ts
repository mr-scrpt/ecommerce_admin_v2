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
  CartRowChangeQuantityDTO,
  CartRowCreateDTO,
  CartRowGetByProductDTO,
  CartRowRemoveDTO,
} from "./cartRow.dto";
import { CartRowEntity } from "./cartRow.types";

@injectable()
export abstract class ICartRepository {
  abstract getCart(dto: CartGetDTO, db?: Tx): Promise<CartEntity>;

  abstract getCartByUser(dto: CartGetByUserDTO, db?: Tx): Promise<CartEntity>;

  abstract getCartRelation(
    dto: CartGetDTO,
    db?: Tx,
  ): Promise<CartRelationEntity>;

  abstract getCartList(db?: Tx): Promise<CartEntity[]>;

  abstract createCart(dto: CartCreateDTO, db?: Tx): Promise<CartEntity>;

  abstract removeCart(dto: CartRemoveDTO, db?: Tx): Promise<CartEntity>;

  abstract removeCartByUserId(
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
    dto: CartRowChangeQuantityDTO,
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
