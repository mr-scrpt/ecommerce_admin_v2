import { AuthorizatoinError } from "@/shared/lib/errors";
import { createUserAbility } from "../_domain/user.ability";
import { UserWithOrdersEntity } from "../_domain/user.types";
import { injectable } from "inversify";
import { IUserRepository } from "../user.server";
import { SessionEntity } from "@/kernel/domain/session.type";

type GetUserWithOrderList = {
  userId: string;
  session: SessionEntity;
};

@injectable()
export class GetUserWithOrderListUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async exec(data: GetUserWithOrderList): Promise<UserWithOrdersEntity> {
    const { userId, session } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserWithOrderList(userId);
  }
}
