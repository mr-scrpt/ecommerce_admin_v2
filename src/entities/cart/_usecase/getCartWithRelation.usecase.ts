import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createCartAbility } from "../_domain/cart.ability";
import { CartId, CartRelationEntity } from "../_domain/types";
import { CartRepository, cartRepository } from "../_repository/cart.repo";

type GetCartWithRelation = {
  cartId: CartId;
  session: SessionEntity;
};

class GetCartWithRelationUseCase {
  constructor(private readonly cartRepo: CartRepository) {}

  async exec(data: GetCartWithRelation): Promise<CartRelationEntity> {
    const { cartId, session } = data;
    const { canGetCart } = createCartAbility(session);

    if (!canGetCart()) {
      throw new AuthorizatoinError();
    }

    return await this.cartRepo.getCartWithRelation(cartId);
  }
}

export const getCartWithRelationUseCase = new GetCartWithRelationUseCase(
  cartRepository,
);
