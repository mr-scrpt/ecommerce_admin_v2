import { injectable } from "inversify";
import { CartGetPayload, CartRelation } from "../_domain/types";
import { CartRepository } from "../server";

@injectable()
export class CartRelationGetService {
  constructor(private readonly cartRepo: CartRepository) {}

  async execute(payload: CartGetPayload): Promise<CartRelation> {
    return await this.cartRepo.getCartRelation(payload);
  }
}
