import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createCartAbility } from "../_domain/cart.ability";
import { CartId, CartRelationEntity } from "../_domain/types";
import { CartRepository } from "../_repository/cart.repo";

type GetCartWithRelationByUserId = {
  userId: CartId;
  session: SessionEntity;
};

export class GetCartWithRelationByUserIdUseCase {
  constructor(private readonly cartRepo: CartRepository) {}

  async exec(data: GetCartWithRelationByUserId): Promise<CartRelationEntity> {
    const { userId, session } = data;
    const { canGetCart } = createCartAbility(session);

    if (!canGetCart()) {
      throw new AuthorizatoinError();
    }

    return await this.cartRepo.getCartWithRelationByUser(userId);
  }
}
