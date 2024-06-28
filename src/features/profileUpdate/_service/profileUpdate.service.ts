import { ProfileEntity } from "@/kernel/domain/profile/profile.type";
import { injectable } from "inversify";
import { IProfileUpdateTx } from "../_domain/transaction.type";
import { ProfileUpdateTxPayload } from "../_domain/types";

@injectable()
export class ProfileUpdateService {
  constructor(private readonly profileUpdateTx: IProfileUpdateTx) {}

  async execute(payload: ProfileUpdateTxPayload): Promise<ProfileEntity> {
    return await this.profileUpdateTx.update(payload);
  }
}
