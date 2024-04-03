import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { UserEntity } from "../../../entities/user/_domain/user.types";
import {
  UserRepository,
  createUserAbility,
  userRepository,
} from "../../../entities/user/user";
import { UserCreateComplexible } from "../domain/types";

type CreateUser = {
  userToCreate: UserCreateComplexible;
  session: SessionEntity;
};

class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: CreateUser): Promise<UserEntity> {
    const { session, userToCreate } = data;
    const { canCreateUser } = createUserAbility(session);

    if (!canCreateUser()) {
      throw new ForbiddenError();
    }

    return await this.userRepo.createUser({
      ...userToCreate,
    });
  }
}

export const createUserUseCase = new CreateUserUseCase(userRepository);
