import { injectable } from "inversify";
import { UserEntity } from "../_domain/user.types";
import { UserRepository } from "../user.server";

@injectable()
export class UserListGetService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(): Promise<Array<UserEntity>> {
    return await this.userRepo.getUserList();
  }
}
