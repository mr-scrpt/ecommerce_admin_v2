import { ForbiddenError } from "@/shared/lib/errors";
import { createProfileAbility } from "../_domain/profile.ability";
import { Profile, ProfileEntity } from "../_domain/types";
import {
  ProfileRepository,
  profileRepository,
} from "../_repository/profile.repo";
import { SessionEntity, UserId } from "@/shared/lib/user";

type UpdateProfile = {
  userId: UserId;
  profileData: Partial<Profile>;
  session: SessionEntity;
};

class UpdateProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async exec(data: UpdateProfile): Promise<ProfileEntity> {
    const { userId, profileData, session } = data;
    const { canUpdateProfile } = createProfileAbility(session);

    if (!canUpdateProfile(userId)) {
      throw new ForbiddenError();
    }

    return await this.profileRepo.updateProfile(userId, profileData);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase(profileRepository);
