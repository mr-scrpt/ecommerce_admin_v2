import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity, UserId } from "@/shared/lib/user";
import { createProfileAbility } from "../_domain/profile.ability";
import {
  ProfileRepository,
  profileRepository,
} from "../_repository/profile.repo";
import { ProfileEntity } from "../_domain/profile.types";

type GetProfile = {
  userId: UserId;
  session: SessionEntity;
};

class GetProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async exec(data: GetProfile): Promise<ProfileEntity> {
    const { userId, session } = data;
    const { canGetProfile } = createProfileAbility(session);

    if (!canGetProfile(userId)) {
      throw new AuthorizatoinError();
    }

    return await this.profileRepo.getProfile(userId);
  }
}

export const getProfileUseCase = new GetProfileUseCase(profileRepository);
