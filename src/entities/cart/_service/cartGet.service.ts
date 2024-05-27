import { injectable } from "inversify";
import { CartGetPayload, CartRelation } from "../_domain/types";
import { CartRepository } from "../server";

@injectable()
export class CartGetService {
  constructor(private readonly cartRepo: CartRepository) {}

  async execute(props: CartGetPayload): Promise<CartRelation> {
    return await this.cartRepo.getCartWithRelation(props.cartId);
  }
}
