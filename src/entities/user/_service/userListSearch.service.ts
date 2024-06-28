import { injectable } from "inversify";
import { UserSearchSelector } from "../_domain/user.types";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { IUserRepository } from "@/kernel/domain/user/repository.type";

@injectable()
export class UserListSearchService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(selector: UserSearchSelector): Promise<Array<UserEntity>> {
    const { q } = selector;
    if (!q) {
      return [];
    }
    return await this.userRepo.searchList(selector);
  }
}
