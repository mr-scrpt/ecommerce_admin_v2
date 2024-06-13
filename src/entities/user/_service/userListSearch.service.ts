import { injectable } from "inversify";
import { UserEntity, UserSearchPayload } from "../_domain/user.types";
import { IUserRepository } from "../_domain/repository.type";

@injectable()
export class UserListSearchService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(selector: UserSearchPayload): Promise<Array<UserEntity>> {
    const { q } = selector;
    if (!q) {
      return [];
    }
    return await this.userRepo.searchUserList(selector);
  }
}
