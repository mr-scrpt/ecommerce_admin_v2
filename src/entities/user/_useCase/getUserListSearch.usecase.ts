import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createUserAbility } from "../_domain/user.ability";
import { UserRepository } from "../_repository/user.repo";
import { UserEntity } from "../_domain/user.types";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { injectable } from "inversify";

type GetUserListSearch = {
  q: string;
  session: SessionEntity;
};

@injectable()
export class GetUserListSearchUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserListSearch): Promise<UserEntity[]> {
    const { session, q } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    if (!q || q === "" || q.length < SEARCH_MIN_LENGTH) {
      return [];
    }
    return await this.userRepo.getUserListSearch(q);
  }
}
