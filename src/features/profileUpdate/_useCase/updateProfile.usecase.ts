import { ForbiddenError } from "@/shared/lib/errors";
import { createProfileAbility } from "../../../entities/user/_domain/profile.ability";
import {
  ProfileRepository,
  profileRepository,
} from "../../../entities/user/_repository/profile.repo";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { Profile, ProfileEntity } from "../../../entities/user/_domain/profile.types";

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
