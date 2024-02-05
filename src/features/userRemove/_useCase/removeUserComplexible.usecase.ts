import { SessionEntity, UserId, createUserAbility } from "@/entities/user/user";
import { ForbiddenError } from "@/shared/lib/errors";
import {
  UserRemoveTx,
  userRemoveTx,
} from "../_repository/userRemove.transaction";

type RemoveUser = {
  userId: UserId;
  session: SessionEntity;
};

class RemoveUserComplexibleUseCase {
  constructor(private readonly userRemoveTx: UserRemoveTx) {}

  async exec(data: RemoveUser): Promise<void> {
    const { userId, session } = data;
    const profileAbility = createUserAbility(session);

    if (!profileAbility.canRemoveUser(userId)) {
      throw new ForbiddenError();
    }

    return await this.userRemoveTx.removeUserById(userId);
  }
}

export const removeUserComplexibleUseCase = new RemoveUserComplexibleUseCase(
  userRemoveTx,
);
