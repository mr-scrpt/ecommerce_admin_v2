import { AuthorizatoinError } from "@/shared/lib/errors";
import { createUserAbility } from "../_domain/ability";
import { Profile, SessionEntity, UserId } from "../_domain/types";
import { profileRepository } from "../_repository/profile.repo";

type GetProfile = {
  userId: UserId;
  session: SessionEntity;
};

export class GetProfileUseCase {
  async exec(data: GetProfile): Promise<Profile> {
    const { userId, session } = data;
    const userAbility = createUserAbility(session);

    if (!userAbility.canGetUser(userId)) {
      throw new AuthorizatoinError();
    }

    return await profileRepository.getProfileById(userId);
  }
}

export const getProfileUseCase = new GetProfileUseCase();
