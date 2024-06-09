import { injectable } from "inversify";
import { UserEntity, UserGetPayload } from "../_domain/user.types";
import { IUserRepository } from "../_domain/repository.type";

@injectable()
export class UserGetService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(payload: UserGetPayload): Promise<UserEntity> {
    return await this.userRepo.getUser(payload);
  }
}
