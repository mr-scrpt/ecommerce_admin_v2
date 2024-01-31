import { Profile, SessionEntity, UserId } from "../_domain/types";
import { createProfileAbility } from "../_domain/ability";
import { AuthorizatoinError } from "@/shared/lib/errors";
import { profileRepository } from "../_repository/profile.repo";

type UpdateProfile = {
  userId: UserId;
  profileData: Partial<Profile>;
  session: SessionEntity;
};

export class UpdateProfileUseCase {
  async exec(data: UpdateProfile): Promise<Profile> {
    const { userId, profileData, session } = data;
    const profileAbility = createProfileAbility(session);

    if (!profileAbility.canUpdateProfile(userId)) {
      throw new AuthorizatoinError();
    }

    return await profileRepository.update(userId, profileData);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();
