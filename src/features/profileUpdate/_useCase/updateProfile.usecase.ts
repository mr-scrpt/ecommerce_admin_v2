import { ProfileEntity } from "@/entities/user/profile";
import { ProfileToUpdate } from "@/entities/user/profile.server";
import { ForbiddenError } from "@/shared/lib/errors";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createProfileAbility } from "../../../entities/user/_domain/profile.ability";
import { ProfileUpdateTx } from "../_tx/profileUpdate.transaction";

type UpdateProfile = {
  profileId: UserId;
  profileData: ProfileToUpdate;
  session: SessionEntity;
};

@injectable()
export class UpdateProfileUseCase {
  constructor(private readonly profileTx: ProfileUpdateTx) {}

  async exec(data: UpdateProfile): Promise<ProfileEntity> {
    const { profileId, profileData, session } = data;
    const { canUpdateProfile } = createProfileAbility(session);

    if (!canUpdateProfile(profileId)) {
      throw new ForbiddenError();
    }

    return await this.profileTx.updateProfile({ profileId, profileData });
  }
}
