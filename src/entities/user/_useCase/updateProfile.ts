import { ForbiddenError } from "@/shared/lib/errors";
import { createProfileAbility } from "../_domain/profile.ability";
import { Profile, SessionEntity, UserId } from "../_domain/types";
import {
  ProfileRepository,
  profileRepository,
} from "../_repository/profile.repo";

type UpdateProfile = {
  userId: UserId;
  profileData: Partial<Profile>;
  session: SessionEntity;
};

class UpdateProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async exec(data: UpdateProfile): Promise<Profile> {
    const { userId, profileData, session } = data;
    const { canUpdateProfile } = createProfileAbility(session);

    if (!canUpdateProfile(userId)) {
      throw new ForbiddenError();
    }

    return await this.profileRepo.update(userId, profileData);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase(profileRepository);
