import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import { UserEntity, UserId } from "../_domain/types";

export class UserRepository {
  constructor(readonly db: DbClient) {}
  async createUser(user: UserEntity, db: Tx = this.db): Promise<UserEntity> {
    return await db.user.create({
      data: user,
    });
  }

  async getUserById(userId: UserId, db: Tx = this.db): Promise<UserEntity> {
    return db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  async getUserList(db: Tx = this.db): Promise<UserEntity[]> {
    return db.user.findMany();
  }

  async removeUserById(userId: UserId, db: Tx = this.db): Promise<void> {
    await db.user.delete({ where: { id: userId } });
  }
}

export const userRepository = new UserRepository(dbClient);
