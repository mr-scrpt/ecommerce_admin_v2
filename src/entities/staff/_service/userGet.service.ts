import { injectable } from "inversify";
import { UserGetSelector } from "../_domain/user.types";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { IUserRepository } from "@/kernel/domain/user/repository.type";

@injectable()
export class UserGetService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(selector: UserGetSelector): Promise<UserEntity> {
    return await this.userRepo.get(selector);
  }
}
