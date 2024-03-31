import { UserEntity, UserWithOrdersEntity } from "../_domain/user.types";
import { UserRepository, userRepository } from "../_repository/user.repo";
import { createUserAbility } from "../_domain/user.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity, UserId } from "@/shared/lib/user";

type GetUserWithOrderList = {
  userId: UserId;
  session: SessionEntity;
};

class GetUserWithOrderListUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserWithOrderList): Promise<UserWithOrdersEntity> {
    const { userId, session } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserWithOrderList(userId);
  }
}

export const getUserWithOrderListUseCase = new GetUserWithOrderListUseCase(
  userRepository,
);
