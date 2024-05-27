import { ProfileRepository } from "@/entities/user/profile.server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ProfileUpdateComplexible } from "../_domain/types";
import { UserEntity } from "@/entities/user/user";

@injectable()
export class ProfileUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly profileRepo: ProfileRepository,
  ) {
    super(db);
  }

  async updateProfile(
    userToUpdate: ProfileUpdateComplexible,
  ): Promise<UserEntity> {
    const { profileId, profileData } = userToUpdate;
    const action = async (tx: Tx) => {
      return await this.profileRepo.updateProfile(profileId, profileData, tx);
    };

    return await this.start(action);
  }
}
