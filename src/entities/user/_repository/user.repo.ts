import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { UserEntity } from "../_domain/user.types";
import {
  User,
  UserToCreate,
  UserWithCartEntity,
  UserWithOrdersEntity,
} from "../_domain/user.types";

@injectable()
export class UserRepository {
  constructor(readonly db: DBClient) {}

  async getUser(userId: string, db: Tx = this.db): Promise<UserEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async getUserWithCart(
    userId: string,
    db: Tx = this.db,
  ): Promise<UserWithCartEntity> {
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

  async getUserWithOrderList(
    userId: string,
    db: Tx = this.db,
  ): Promise<UserWithOrdersEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        orderList: true,
      },
    });
    return user;
  }

  async getUserList(db: Tx = this.db): Promise<UserEntity[]> {
    return db.user.findMany();
  }

  async getUserListSearch(q: string, db: Tx = this.db): Promise<UserEntity[]> {
    return db.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,

              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  }

  async createUser(user: UserToCreate, db: Tx = this.db): Promise<UserEntity> {
    return await db.user.create({
      data: user,
    });
  }

  async updateUser(
    targetId: string,
    userData: Partial<User>,
    db: Tx = this.db,
  ): Promise<UserEntity> {
    return await db.user.update({
      where: { id: targetId },
      data: userData,
    });
  }

  async removeUserById(userId: string, db: Tx = this.db): Promise<UserEntity> {
    return await db.user.delete({ where: { id: userId } });
  }
}
