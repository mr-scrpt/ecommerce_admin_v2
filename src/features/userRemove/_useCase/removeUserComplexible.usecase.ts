import { createUserAbility } from "@/entities/user/user";
import { ForbiddenError } from "@/shared/lib/errors";
import {
  UserRemoveTx,
  userRemoveTx,
} from "../_repository/userRemove.transaction";
import { UserEntity } from "@/entities/user/_domain/types";
import { SessionEntity, UserId } from "@/shared/lib/user";

type RemoveUser = {
  userId: UserId;
  session: SessionEntity;
};

class RemoveUserComplexibleUseCase {
  constructor(private readonly userRemoveTx: UserRemoveTx) {}

  async exec(data: RemoveUser): Promise<UserEntity> {
    const { userId, session } = data;
    const { canRemoveUser } = createUserAbility(session);

    if (!canRemoveUser(userId)) {
      throw new ForbiddenError();
    }

    return await this.userRemoveTx.removeUserById(userId);
  }
}

export const removeUserComplexibleUseCase = new RemoveUserComplexibleUseCase(
  userRemoveTx,
);
