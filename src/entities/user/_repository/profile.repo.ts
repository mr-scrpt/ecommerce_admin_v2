import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { ProfileGetDTO, ProfileUpdateDTO } from "../_domain/profile.dto";
import { ProfileEntity } from "../_domain/profile.types";

@injectable()
export class ProfileRepository {
  constructor(readonly db: DBClient) {}

  async getProfile(
    dto: ProfileGetDTO,
    db: Tx = this.db,
  ): Promise<ProfileEntity> {
    const { profileId } = dto;
    return db.user.findUniqueOrThrow({
      where: {
        id: profileId,
      },
    });
  }

  async getProfileList(db: Tx = this.db): Promise<ProfileEntity[]> {
    return db.user.findMany({});
  }

  async updateProfile(
    dto: ProfileUpdateDTO,
    db: Tx = this.db,
  ): Promise<ProfileEntity> {
    const { id, ...data } = dto;

    console.log("output_log: dto =>>>", dto);
    return await db.user.update({
      where: { id },
      data,
    });
  }
}
