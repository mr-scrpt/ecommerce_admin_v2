import { AuthorizatoinError } from "@/shared/lib/errors";
import { createProfileAbility } from "../_domain/profile.ability";
import { Profile, SessionEntity, UserId } from "../_domain/types";
import {
  ProfileRepository,
  profileRepository,
} from "../_repository/profile.repo";

type GetProfile = {
  userId: UserId;
  session: SessionEntity;
};

class GetProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async exec(data: GetProfile): Promise<Profile> {
    const { userId, session } = data;
    const { canGetProfile } = createProfileAbility(session);

    if (!canGetProfile(userId)) {
      throw new AuthorizatoinError();
    }

    return await this.profileRepo.getProfileById(userId);
  }
}

export const getProfileUseCase = new GetProfileUseCase(profileRepository);