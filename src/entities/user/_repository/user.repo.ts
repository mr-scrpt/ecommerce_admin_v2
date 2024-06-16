import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import {
  UserCreateDTO,
  UserGetDTO,
  UserRemoveDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "../_domain/user.dto";
import {
  UserEntity,
  UserWithCartEntity,
  UserWithOrdersEntity,
} from "../_domain/user.types";
import { IUserRepository } from "../_domain/repository.type";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: UserGetDTO, db: Tx = this.db): Promise<UserEntity> {
    const { id: userId } = dto;
    const user = await db.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async getWithCart(
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

  // async getWithOrderList(
  //   dto: UserGetDTO,
  //
  //   db: Tx = this.db,
  // ): Promise<UserWithOrdersEntity> {
  //   const { id: userId } = dto;
  //   const user = await db.user.findUniqueOrThrow({
  //     where: {
  //       id: userId,
  //     },
  //     include: {
  //       orderList: true,
  //     },
  //   });
  //   return user;
  // }

  async getList(db: Tx = this.db): Promise<UserEntity[]> {
    return db.user.findMany();
  }

  async searchList(
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

  async create(user: UserCreateDTO, db: Tx = this.db): Promise<UserEntity> {
    const { data } = user;
    return await db.user.create({
      data,
    });
  }

  async update(dto: UserUpdateDTO, db: Tx = this.db): Promise<UserEntity> {
    const { id, ...userData } = dto;
    return await db.user.update({
      where: { id },
      data: userData,
    });
  }

  async remove(dto: UserRemoveDTO, db: Tx = this.db): Promise<UserEntity> {
    const { userId } = dto;
    return await db.user.delete({ where: { id: userId } });
  }
}
