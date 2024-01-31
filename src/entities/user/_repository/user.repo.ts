import { dbClient } from "@/shared/lib/db";
import { UserEntity, UserId } from "../_domain/types";
import { User } from "@prisma/client";

export class UserRepository {
  async createUser(user: UserEntity): Promise<UserEntity> {
    return await dbClient.user.create({
      data: user,
    });
  }

  async getUserById(userId: UserId): Promise<UserEntity> {
    return dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }
}

export const userRepository = new UserRepository();
