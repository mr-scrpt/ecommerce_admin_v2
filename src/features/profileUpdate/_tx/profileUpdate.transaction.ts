import { ProfileEntity } from "@/kernel/domain/profile/profile.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ProfileUpdateTxDTO } from "../_domain/types";
import { IProfileUpdateTx } from "../_domain/transaction.type";
import { IProfileRepository } from "@/kernel/domain/profile/repository.type";

@injectable()
export class ProfileUpdateTx extends Transaction implements IProfileUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly profileRepo: IProfileRepository,
  ) {
    super(db);
  }

  async update(dto: ProfileUpdateTxDTO): Promise<ProfileEntity> {
    const { profileData, selector } = dto;

    const action = async (tx: Tx) => {
      return await this.profileRepo.update({ selector, data: profileData }, tx);
    };

    return await this.start(action);
  }
}
