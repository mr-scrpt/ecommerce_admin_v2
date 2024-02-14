import { ForbiddenError } from "@/shared/lib/errors";
import { UserRepository, userRepository } from "../_repository/user.repo";
import { createUserAbility } from "../user";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { UserEntity } from "../_domain/user.types";

type RemoveUser = {
  userId: UserId;
  session: SessionEntity;
};

class RemoveUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: RemoveUser): Promise<UserEntity> {
    const { userId, session } = data;
    const { canRemoveUser } = createUserAbility(session);

    if (!canRemoveUser(userId)) {
      throw new ForbiddenError();
    }

    return await this.userRepo.removeUserById(userId);
  }
}

export const removeUserUseCase = new RemoveUserUseCase(userRepository);
