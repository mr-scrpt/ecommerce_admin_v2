import { DBClient, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { UserWithCartEntity } from "../_domain/user.types";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { IUserRepository } from "@/kernel/domain/user/repository.type";
import {
  UserCreateDTO,
  UserGetDTO,
  UserRemoveDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "@/kernel/domain/user/user.dto";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(readonly db: DBClient) {}

  async get(dto: UserGetDTO, db: Tx = this.db): Promise<UserEntity> {
    const user = await db.user.findUniqueOrThrow({
      where: dto,
    });
    return user;
  }

  async getWithCart<T>(dto: UserGetDTO, db: Tx = this.db): Promise<T> {
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
    return user as T;
  }

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

  async create(dto: UserCreateDTO, db: Tx = this.db): Promise<UserEntity> {
    const { data } = dto;
    return await db.user.create({
      data,
    });
  }

  async update(dto: UserUpdateDTO, db: Tx = this.db): Promise<UserEntity> {
    const { selector, data } = dto;
    return await db.user.update({
      where: selector,
      data,
    });
  }

  async remove(dto: UserRemoveDTO, db: Tx = this.db): Promise<UserEntity> {
    const { selector } = dto;
    return await db.user.delete({ where: selector });
  }
}
