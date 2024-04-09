import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { createUserAbility } from "../_domain/user.ability";
import { UserRepository } from "../_repository/user.repo";
import { UserEntity, UserFiledEntity } from "../_domain/user.types";
import { SEARCH_MIN_LENGTH } from "@/shared/config/constant";
import { injectable } from "inversify";

type GetUserListSearch = {
  q: string;
  session: SessionEntity;
};

@injectable()
export class GetUserListSearchUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async exec(data: GetUserListSearch): Promise<UserFiledEntity[]> {
    const { session, q } = data;
    const { canGetUser } = createUserAbility(session);

    if (!canGetUser()) {
      throw new AuthorizatoinError();
    }

    if (!q || q === "" || q.length < SEARCH_MIN_LENGTH) {
      return [];
    }
    const userList = await this.userRepo.getUserListSearch(q);

    return this.userFilteredList(userList);
  }

  async userFilteredList(userList: UserEntity[]): Promise<UserFiledEntity[]> {
    const filteredUserList = userList.filter((user) => {
      if (user.name) {
        return user;
      }
    });
    return filteredUserList;
  }
}
