import { ProfileRepository } from "@/entities/user/profile.server";
import { UserEntity } from "@/entities/user/user.server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { injectable } from "inversify";
import { ProfileUpdateComplexible } from "../_domain/types";

@injectable()
export class ProfileUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly profileRepo: ProfileRepository,
  ) {
    super(dbClient);
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
