import { ProfileEntity } from "@/entities/user/profile";
import { injectable } from "inversify";
import { ProfileUpdateTxPayload } from "../_domain/types";
import { ProfileUpdateTx } from "../_tx/profileUpdate.transaction";

@injectable()
export class ProfileUpdateService {
  constructor(private readonly profileUpdateTx: ProfileUpdateTx) {}

  async execute(payload: ProfileUpdateTxPayload): Promise<ProfileEntity> {
    console.log("output_log: payload =>>>", payload);
    return await this.profileUpdateTx.updateProfile({ profileData: payload });
  }
}
