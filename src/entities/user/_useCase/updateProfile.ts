import { Profile, SessionEntity, UserId } from "../_domain/types";
import { AuthorizatoinError } from "@/shared/lib/errors";
import {
  ProfileRepository,
  profileRepository,
} from "../_repository/profile.repo";
import { createProfileAbility } from "../_domain/profile.ability";

type UpdateProfile = {
  userId: UserId;
  profileData: Partial<Profile>;
  session: SessionEntity;
};

class UpdateProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async exec(data: UpdateProfile): Promise<Profile> {
    const { userId, profileData, session } = data;
    const profileAbility = createProfileAbility(session);

    if (!profileAbility.canUpdateProfile(userId)) {
      throw new AuthorizatoinError();
    }

    return await this.profileRepo.update(userId, profileData);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase(profileRepository);
