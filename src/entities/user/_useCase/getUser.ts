import { SessionEntity, UserEntity, UserId } from "../_domain/types";
import { UserRepository, userRepository } from "../_repository/user.repo";
import { createUserAbility } from "../_domain/user.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";

type GetUser = {
  userId: UserId;
  session: SessionEntity;
};

class GetUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUser): Promise<UserEntity> {
    const { userId, session } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser(userId)) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserById(userId);
  }
}

export const getUserUseCase = new GetUserUseCase(userRepository);
