import { ProfileRepository } from "@/entities/user/profile.server";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ProfileUpdateTxDTO } from "../_domain/types";
import { UserEntity } from "@/kernel/domain/user/user.type";

@injectable()
export class ProfileUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly profileRepo: ProfileRepository,
  ) {
    super(db);
  }

  async updateProfile(dto: ProfileUpdateTxDTO): Promise<UserEntity> {
    const { profileData } = dto;
    console.log("output_log: profileData =>>>", profileData);

    const action = async (tx: Tx) => {
      return await this.profileRepo.updateProfile(profileData, tx);
    };

    return await this.start(action);
  }
}
