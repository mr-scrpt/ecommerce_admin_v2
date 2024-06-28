import { UserEntity } from "@/kernel/domain/user/user.type";
import { Tx } from "@/shared/lib/db/db";
import {
  UserCreateDTO,
  UserGetDTO,
  UserRemoveDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "./user.dto";

export abstract class IUserRepository {
  abstract get(dto: UserGetDTO, db?: Tx): Promise<UserEntity>;

  abstract getWithCart<T>(dto: UserGetDTO, db?: Tx): Promise<T>;

  abstract getList(db?: Tx): Promise<UserEntity[]>;

  abstract searchList(dto: UserSearchDTO, db?: Tx): Promise<UserEntity[]>;

  abstract create(user: UserCreateDTO, db?: Tx): Promise<UserEntity>;

  abstract update(dto: UserUpdateDTO, db?: Tx): Promise<UserEntity>;

  abstract remove(dto: UserRemoveDTO, db?: Tx): Promise<UserEntity>;
}
