import { AuthorizatoinError } from "@/shared/lib/errors";
import { Profile } from "../_domain/types";
import { createUserAbility } from "../_domain/user.ability";
import { UserRepository, userRepository } from "../_repository/user.repo";
import { SessionEntity, UserId } from "@/shared/lib/user";

type GetUserList = {
  userId: UserId;
  session: SessionEntity;
};

class GetUserListUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserList): Promise<Profile[]> {
    const { session } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserList();
  }
}

export const getUserListUseCase = new GetUserListUseCase(userRepository);
