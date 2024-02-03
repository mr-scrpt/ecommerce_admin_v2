import { AuthorizatoinError } from "@/shared/lib/errors";
import { Profile, SessionEntity, UserId } from "../_domain/types";
import { createUserAbility } from "../_domain/user.ability";
import { UserRepository, userRepository } from "../_repository/user.repo";

type GetUserList = {
  userId: UserId;
  session: SessionEntity;
};

class GetUserListUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserList): Promise<Profile[]> {
    const { userId, session } = data;
    const userAbility = createUserAbility(session);

    if (!userAbility.canGetUser(userId)) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserList();
  }
}

export const getUserListUseCase = new GetUserListUseCase(userRepository);
