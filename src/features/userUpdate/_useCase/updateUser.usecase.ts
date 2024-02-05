import {
  SessionEntity,
  UserId,
  UserRepository,
  UserUpdate,
  createUserAbility,
  userRepository,
} from "@/entities/user/user";
import { ForbiddenError } from "@/shared/lib/errors";

type UpdateUser = {
  userData: UserUpdate;
  targetId: UserId;
  session: SessionEntity;
};

class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: UpdateUser): Promise<void> {
    const { userData, session, targetId } = data;
    const { canUpdateUser } = createUserAbility(session);

    if (!canUpdateUser(targetId)) {
      throw new ForbiddenError();
    }

    return await this.userRepo.updateUser(userData, targetId);
  }
}

export const updateUserUseCase = new UpdateUserUseCase(userRepository);
