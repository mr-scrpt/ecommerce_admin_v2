import { AuthorizatoinError, ForbiddenError } from "@/shared/lib/errors";
import { createProfileAbility } from "../_domain/profile.ability";
import { UserRepository, userRepository } from "../_repository/user.repo";
import { UserId, createUserAbility } from "../user";
import { SessionEntity } from "../_domain/types";

type RemoveUser = {
  userId: UserId;
  session: SessionEntity;
};

class RemoveUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: RemoveUser): Promise<void> {
    const { userId, session } = data;
    const { canRemoveUser } = createUserAbility(session);

    if (!canRemoveUser(userId)) {
      throw new ForbiddenError();
    }

    return await this.userRepo.removeUserById(userId);
  }
}

export const removeUserUseCase = new RemoveUserUseCase(userRepository);
