import { ProfileEntity } from "@/entities/user/profile";
import { injectable } from "inversify";
import { ProfileUpdateComplexible } from "../_domain/types";
import { ProfileUpdateTx } from "../_tx/profileUpdate.transaction";

@injectable()
export class ProfileUpdateService {
  constructor(private readonly profileUpdateTx: ProfileUpdateTx) {}

  async execute(props: ProfileUpdateComplexible): Promise<ProfileEntity> {
    return await this.profileUpdateTx.updateProfile(props);
  }
}
