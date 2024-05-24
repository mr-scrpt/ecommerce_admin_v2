import { injectable } from "inversify";
import { CartRelationEntity } from "../_domain/types";
import { CartRepository } from "../server";

type CartGetWithRelation = {
  cartId: string;
};

@injectable()
export class CartGetService {
  constructor(private readonly cartRepo: CartRepository) {}

  async execute(props: CartGetWithRelation): Promise<CartRelationEntity> {
    return await this.cartRepo.getCartWithRelation(props.cartId);
  }
}
