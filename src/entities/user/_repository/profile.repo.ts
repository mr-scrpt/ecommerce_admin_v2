import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import { Profile, UserId } from "../_domain/types";

export class ProfileRepository {
  constructor(readonly db: DbClient) {}
  async getProfileList(db: Tx = this.db): Promise<Profile[]> {
    return db.user.findMany({});
  }

  async getProfileById(userId: UserId, db: Tx = this.db): Promise<Profile> {
    return db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  async updateProfile(
    targetId: UserId,
    data: Partial<Profile>,
    db: Tx = this.db,
  ): Promise<Profile> {
    return await db.user.update({
      where: { id: targetId },
      data,
    });
  }
}

export const profileRepository = new ProfileRepository(dbClient);
