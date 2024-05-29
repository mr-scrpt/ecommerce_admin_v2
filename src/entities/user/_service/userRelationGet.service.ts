import { injectable } from "inversify";
import { ProfileEntity } from "../_domain/profile.types";
import { UserGetPayload } from "../_domain/user.types";
import { UserRepository } from "../user.server";

@injectable()
export class UserRelationGetService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(payload: UserGetPayload): Promise<ProfileEntity> {
    return await this.userRepo.getUserWithCart(payload);
  }
}
