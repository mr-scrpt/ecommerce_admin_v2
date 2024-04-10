import { DBClient, Tx } from "@/shared/lib/db";
import { UserId } from "@/shared/lib/user";
import { injectable } from "inversify";
import {
  User,
  UserDummyEntity,
  UserEntity,
  UserToCreate,
  UserToRegistration,
  UserWithCartEntity,
  UserWithOrdersEntity,
} from "../_domain/user.types";

@injectable()
export class UserRepository {
  constructor(readonly db: DBClient) {}

  async getUser(userId: UserId, db: Tx = this.db): Promise<UserEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
        NOT: {
          phone: null,
          name: null,
        },
      },
    });
    return user as UserEntity;
  }

  async getUserEntity(
    userId: UserId,
    db: Tx = this.db,
  ): Promise<UserDummyEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async getUserWithCart(
    userId: UserId,
    db: Tx = this.db,
  ): Promise<UserWithCartEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
        NOT: {
          phone: null,
          name: null,
        },
      },
      include: {
        cart: {
          include: {
            cartRowList: true,
          },
        },
      },
    });
    return user as UserWithCartEntity;
  }

  async getUserWithOrderList(
    userId: UserId,
    db: Tx = this.db,
  ): Promise<UserWithOrdersEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
        NOT: {
          phone: null,
          name: null,
        },
      },
      include: {
        orderList: true,
      },
    });
    return user as UserWithOrdersEntity;
  }

  async getUserList(db: Tx = this.db): Promise<UserEntity[]> {
    return db.user.findMany({
      where: {
        NOT: {
          phone: null,
          name: null,
        },
      },
    }) as Promise<UserEntity[]>;
  }

  async getUserEntityList(db: Tx = this.db): Promise<UserDummyEntity[]> {
    return db.user.findMany();
  }

  async getUserListSearch(q: string, db: Tx = this.db): Promise<UserEntity[]> {
    return db.user.findMany({
      where: {
        NOT: {
          phone: null,
          name: null,
        },
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
    }) as Promise<UserEntity[]>;
  }

  async createUser(user: UserToCreate, db: Tx = this.db): Promise<UserEntity> {
    return db.user.create({
      data: user,
    }) as Promise<UserEntity>;
  }

  async registrationUser(
    user: UserToRegistration,
    db: Tx = this.db,
  ): Promise<UserDummyEntity> {
    return db.user.create({
      data: user,
    });
  }

  async updateUser(
    targetId: UserId,
    userData: Partial<User>,
    db: Tx = this.db,
  ): Promise<UserEntity> {
    return db.user.update({
      where: { id: targetId },
      data: userData,
    }) as Promise<UserEntity>;
  }

  async removeUserById(userId: UserId, db: Tx = this.db): Promise<UserEntity> {
    return db.user.delete({ where: { id: userId } }) as Promise<UserEntity>;
  }
}
