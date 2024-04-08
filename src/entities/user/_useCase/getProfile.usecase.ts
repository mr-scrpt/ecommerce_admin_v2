import { AuthorizatoinError } from "@/shared/lib/errors";
import { SessionEntity } from "@/shared/lib/user";
import { injectable } from "inversify";
import { createProfileAbility } from "../_domain/profile.ability";
import { ProfileEntity } from "../_domain/profile.types";
import { ProfileRepository } from "../_repository/profile.repo";

type GetProfile = {
  profileId: string;
  session: SessionEntity;
};

@injectable()
export class GetProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async exec(data: GetProfile): Promise<ProfileEntity> {
    const { profileId, session } = data;
    const { canGetProfile } = createProfileAbility(session);

    if (!canGetProfile(profileId)) {
      throw new AuthorizatoinError();
    }

    return await this.profileRepo.getProfile(profileId);
  }
}
