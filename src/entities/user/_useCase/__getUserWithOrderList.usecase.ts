import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { createUserAbility } from "../_domain/user.ability";
import { UserWithOrdersEntity } from "../_domain/user.types";
import { UserRepository } from "../_repository/user.repo";
import { injectable } from "inversify";

type GetUserWithOrderList = {
  userId: UserId;
  session: SessionEntity;
};

@injectable()
export class GetUserWithOrderListUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserWithOrderList): Promise<UserWithOrdersEntity> {
    const { userId, session } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserWithOrderList(userId);
  }
}
