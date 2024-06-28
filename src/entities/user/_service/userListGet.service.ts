import { injectable } from "inversify";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { IUserRepository } from "@/kernel/domain/user/repository.type";

@injectable()
export class UserListGetService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<Array<UserEntity>> {
    return await this.userRepo.getList();
  }
}
