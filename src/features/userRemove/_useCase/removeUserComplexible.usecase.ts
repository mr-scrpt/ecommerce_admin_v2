import { ForbiddenError } from "@/shared/lib/errors";
import { UserRemoveTx } from "../_tx/userRemove.transaction";
import { UserEntity } from "@/entities/user/_domain/user.types";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { createUserAbility } from "@/entities/user/user.server";
import { injectable } from "inversify";

type RemoveUser = {
  userId: UserId;
  session: SessionEntity;
};

@injectable()
export class RemoveUserComplexibleUseCase {
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
