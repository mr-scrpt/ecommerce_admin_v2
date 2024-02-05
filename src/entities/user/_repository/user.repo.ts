import { dbClient } from "@/shared/lib/db";
import { UserEntity, UserId } from "../_domain/types";
import {
  PrismaService,
  Tx,
} from "@/features/userRemove/_repository/userRemove.transaction";

export class UserRepository {
  constructor(readonly db: PrismaService) {}
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
    console.log("output_log: current db remove =>>>", userId);
    try {
      // await dbClient.user.delete({ where: { id: userId } });
      await db.user.delete({ where: { id: userId } });
    } catch (e) {
      console.log("output_log:  =>>>", e);
    }
    // db.user.delete({ where: { id: userId } });
  }
}

export const userRepository = new UserRepository(dbClient);
