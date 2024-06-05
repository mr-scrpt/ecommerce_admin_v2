import { injectable } from "inversify";
import { CartRepository } from "../server";
import { CartGetSelector, CartRelation } from "../_domain/cart.types";

@injectable()
export class CartRelationGetService {
  constructor(private readonly cartRepo: CartRepository) {}

  async execute(payload: CartGetSelector): Promise<CartRelation> {
    return await this.cartRepo.getCartRelation(payload);
  }
}
