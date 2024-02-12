import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { UserEntity } from "../_domain/types";
import { createUserAbility } from "../_domain/user.ability";
import { UserRepository, userRepository } from "../_repository/user.repo";

type GetUserList = {
  userId: UserId;
  session: SessionEntity;
};

class GetUserListUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserList): Promise<UserEntity[]> {
    const { session } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserList();
  }
}

export const getUserListUseCase = new GetUserListUseCase(userRepository);
