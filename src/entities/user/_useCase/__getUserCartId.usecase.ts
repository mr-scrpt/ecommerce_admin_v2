import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { createUserAbility } from "../_domain/user.ability";
import { UserWithCartEntity } from "../_domain/user.types";
import { UserRepository, userRepository } from "../_repository/user.repo";

type GetUserWithCart = {
  userId: UserId;
  session: SessionEntity;
};

class GetUserCartIdUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserWithCart): Promise<UserWithCartEntity> {
    const { userId, session } = data;
    const { canGetUser } = createUserAbility(session);
    // console.log("output_log: in usecase =>>>", userId, session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    return await this.userRepo.getUserWithCart(userId);
  }
}

export const getUserCartIdUseCase = new GetUserCartIdUseCase(userRepository);
