import { injectable } from "inversify";
import { UserEntity } from "../_domain/user.types";
import { IUserRepository } from "../_domain/repository.type";

@injectable()
export class UserListGetService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<Array<UserEntity>> {
    return await this.userRepo.getList();
  }
}
