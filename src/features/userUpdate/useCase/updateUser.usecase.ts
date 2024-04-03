import { ForbiddenError } from "@/shared/lib/errors";
import { User, UserEntity } from "../../../entities/user/_domain/user.types";
import { UserRepository, createUserAbility, userRepository } from "../../../entities/user/user";
import { SessionEntity, UserId } from "@/shared/lib/user";

type UpdateUser = {
  userId: UserId;
  userData: Partial<User>;
  session: SessionEntity;
};

class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: UpdateUser): Promise<UserEntity> {
    const { userId, userData, session } = data;
    const { canUpdateUser } = createUserAbility(session);

    if (!canUpdateUser()) {
      throw new ForbiddenError();
    }

    return await this.userRepo.updateUser(userId, userData);
  }
}

export const updateUserUseCase = new UpdateUserUseCase(userRepository);
