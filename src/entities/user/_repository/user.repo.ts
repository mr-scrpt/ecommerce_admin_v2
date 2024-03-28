import { DbClient, Tx, dbClient } from "@/shared/lib/db";
import {
  User,
  UserEntity,
  UserRelationEntity,
  UserToCreate,
} from "../_domain/user.types";
import { UserId } from "@/shared/lib/user";

export class UserRepository {
  constructor(readonly db: DbClient) {}

  async getUser(userId: UserId, db: Tx = this.db): Promise<UserEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    console.log("output_log: user in repo =>>>", user);
    return user;
  }

  // async getUserCartId(
  //   userId: UserId,
  //   db: Tx = this.db,
  // ): Promise<string | undefined> {
  //   const user = await db.user.findUniqueOrThrow({
  //     where: {
  //       id: userId,
  //     },
  //     include: {
  //       cart: true,
  //     },
  //   });
  //   return user.cart?.id;
  // }

  async getUserWithCart(
    userId: UserId,
    db: Tx = this.db,
  ): Promise<UserRelationEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        cart: {
          include: {
            cartRowList: true,
          },
        },
      },
    });
    return user;
  }

  // async getUserCartId(
  //   userId: UserId,
  //   db: Tx = this.db,
  // ): Promise<{ cart: { id: string } }> {
  //   const user = await db.user.findUniqueOrThrow({
  //     where: {
  //       id: userId,
  //     },
  //     include: {
  //       cart: { select: { id: true } },
  //     },
  //   });
  //   return {
  //     cart: { id: user.cart!.id },
  //   };
  // }

  async getUserList(db: Tx = this.db): Promise<UserEntity[]> {
    return db.user.findMany();
  }

  async createUser(user: UserToCreate, db: Tx = this.db): Promise<UserEntity> {
    console.log("output_log: user in repo =>>>", user);
    return await db.user.create({
      data: user,
    });
  }

  async updateUser(
    targetId: UserId,
    userData: Partial<User>,
    db: Tx = this.db,
  ): Promise<UserEntity> {
    return await db.user.update({
      where: { id: targetId },
      data: userData,
    });
  }

  async removeUserById(userId: UserId, db: Tx = this.db): Promise<UserEntity> {
    return await db.user.delete({ where: { id: userId } });
  }
}

export const userRepository = new UserRepository(dbClient);
