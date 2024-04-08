import { UserEntity } from "../_domain/user.types";
import { UserRepository } from "../_repository/user.repo";
import { createUserAbility } from "../_domain/user.ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { injectable } from "inversify";

type GetUser = {
  userId: UserId;
  session: SessionEntity;
};

@injectable()
export class GetUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUser): Promise<UserEntity> {
    const { userId, session } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUser(userId);
  }
}
