import { UserEntity, UserToCreate } from "@/entities/user/_domain/user.types";
import { createUserAbility } from "@/entities/user/user";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { UserCreateTx, userCreateTx } from "../_tx/userCreate.transaction";

class CreateUserComplexibleUseCase {
  constructor(private readonly userCreateTx: UserCreateTx) {}

  async exec(user: UserToCreate): Promise<UserEntity> {
    return await this.userCreateTx.createUser(user);
  }
}

export const createUserComplexibleUseCase = new CreateUserComplexibleUseCase(
  userCreateTx,
);
