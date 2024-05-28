import { injectable } from "inversify";
import { ProfileEntity } from "../_domain/profile.types";
import { ProfileRepository } from "../_repository/profile.repo";

type ProfileGet = {
  id: string;
};

@injectable()
export class ProfileGetService {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async execute(props: ProfileGet): Promise<ProfileEntity> {
    const { id } = props;
    return await this.profileRepo.getProfile({ profileId: id });
  }
}
