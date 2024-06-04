import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { UserEntity } from "../_domain/user.types";
import {
  User,
  UserWithCartEntity,
  UserWithOrdersEntity,
} from "../_domain/user.types";
import {
  UserCreateDTO,
  UserGetDTO,
  UserRemoveDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "../_domain/user.dto";

@injectable()
export class UserRepository {
  constructor(readonly db: DBClient) {}

  async getUser(dto: UserGetDTO, db: Tx = this.db): Promise<UserEntity> {
    const { id: userId } = dto;
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async getUserWithCart(
    dto: UserGetDTO,
    db: Tx = this.db,
  ): Promise<UserWithCartEntity> {
    const { id: userId } = dto;
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
    dto: UserGetDTO,

    db: Tx = this.db,
  ): Promise<UserWithOrdersEntity> {
    const { id: userId } = dto;
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

  async getUserListSearch(
    dto: UserSearchDTO,
    db: Tx = this.db,
  ): Promise<UserEntity[]> {
    const { q } = dto;
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

  async createUser(user: UserCreateDTO, db: Tx = this.db): Promise<UserEntity> {
    return await db.user.create({
      data: user,
    });
  }

  async updateUser(dto: UserUpdateDTO, db: Tx = this.db): Promise<UserEntity> {
    const { id, ...userData } = dto;
    return await db.user.update({
      where: { id },
      data: userData,
    });
  }

  async removeUserById(
    dto: UserRemoveDTO,
    db: Tx = this.db,
  ): Promise<UserEntity> {
    const { userId } = dto;
    return await db.user.delete({ where: { id: userId } });
  }
}
