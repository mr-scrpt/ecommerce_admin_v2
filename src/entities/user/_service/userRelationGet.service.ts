import { injectable } from "inversify";
import { ProfileEntity } from "../_domain/profile.types";
import { UserGetPayload } from "../_domain/user.types";
import { IUserRepository } from "../_domain/repository.type";

@injectable()
export class UserRelationGetService {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(payload: UserGetPayload): Promise<ProfileEntity> {
    return await this.userRepo.getWithCart(payload);
  }
}
