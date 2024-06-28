import { injectable } from "inversify";
import { CartGetSelector, CartRelation } from "../_domain/cart.types";
import { ICartRepository } from "@/kernel/domain/cart/repository.type";

@injectable()
export class CartRelationGetService {
  constructor(private readonly cartRepo: ICartRepository) {}

  async execute(selector: CartGetSelector): Promise<CartRelation> {
    return await this.cartRepo.getRelation(selector);
  }
}
