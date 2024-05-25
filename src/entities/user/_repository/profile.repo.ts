import { DBClient, Tx } from "@/shared/lib/db/db";
import { UserId } from "@/shared/lib/user";
import { injectable } from "inversify";
import { Profile, ProfileEntity } from "../_domain/profile.types";

@injectable()
export class ProfileRepository {
  constructor(readonly db: DBClient) {}

  async getProfile(
    profileId: string,
    db: Tx = this.db,
  ): Promise<ProfileEntity> {
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
    targetId: UserId,
    data: Partial<Profile>,
    db: Tx = this.db,
  ): Promise<ProfileEntity> {
    return await db.user.update({
      where: { id: targetId },
      data,
    });
  }
}
