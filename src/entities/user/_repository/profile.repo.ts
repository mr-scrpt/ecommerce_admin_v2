import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import { Profile } from "../_domain/types";
import { UserId } from "@/shared/lib/user";

export class ProfileRepository {
  constructor(readonly db: DbClient) {}

  async getProfile(userId: UserId, db: Tx = this.db): Promise<Profile> {
    return db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  async getProfileList(db: Tx = this.db): Promise<Profile[]> {
    return db.user.findMany({});
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
