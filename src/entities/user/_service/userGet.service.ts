import { injectable } from "inversify";
import { UserEntity, UserGetPayload } from "../_domain/user.types";
import { UserRepository } from "../user.server";

@injectable()
export class UserGetService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(payload: UserGetPayload): Promise<UserEntity> {
    return await this.userRepo.getUser(payload);
  }
}
