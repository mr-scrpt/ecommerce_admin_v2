import { injectable } from "inversify";
import { CartGetSelector, CartRelation } from "../_domain/types";
import { CartRepository } from "../server";

@injectable()
export class CartRelationGetService {
  constructor(private readonly cartRepo: CartRepository) {}

  async execute(payload: CartGetSelector): Promise<CartRelation> {
    return await this.cartRepo.getCartRelation(payload);
  }
}
