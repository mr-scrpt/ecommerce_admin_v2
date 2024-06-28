import { injectable } from "inversify";
import { ProfileEntity } from "@/kernel/domain/profile/profile.type";
import { IProfileRepository } from "@/kernel/domain/profile/repository.type";

type ProfileGet = {
  id: string;
};

@injectable()
export class ProfileGetService {
  constructor(private readonly profileRepo: IProfileRepository) {}

  async execute(props: ProfileGet): Promise<ProfileEntity> {
    const { id } = props;
    return await this.profileRepo.get({ id: id });
  }
}
