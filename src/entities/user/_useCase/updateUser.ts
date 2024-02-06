import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity, User, UserId } from "../_domain/types";
import { UserRepository, createUserAbility, userRepository } from "../user";

type UpdateUser = {
  userId: UserId;
  userData: Partial<User>;
  session: SessionEntity;
};

class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: UpdateUser): Promise<User> {
    const { userId, userData, session } = data;
    const { canUpdateUser } = createUserAbility(session);

    if (!canUpdateUser(userId)) {
      throw new ForbiddenError();
    }

    return await this.userRepo.updateUser(userId, userData);
  }
}

export const updateUserUseCase = new UpdateUserUseCase(userRepository);
