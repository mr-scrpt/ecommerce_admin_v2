import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createUserAbility } from "../_domain/user.ability";
import { UserEntity } from "../_domain/user.types";
import { UserRepository, userRepository } from "../_repository/user.repo";

type GetUserList = {
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
