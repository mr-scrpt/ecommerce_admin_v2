import { DBClient, Tx } from "@/shared/lib/db/db";
import {
  UserCreateDTO,
  UserGetDTO,
  UserRemoveDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "../_domain/user.dto";
import { UserWithCartEntity } from "../_domain/user.types";
import { UserEntity } from "@/kernel/domain/user/user.type";

export abstract class IUserRepository {
  constructor(readonly db: DBClient) {}

  abstract get(dto: UserGetDTO, db?: Tx): Promise<UserEntity>;

  abstract getWithCart(dto: UserGetDTO, db?: Tx): Promise<UserWithCartEntity>;

  // abstract getWithOrderList(
  //   dto: UserGetDTO,
  //   db?: Tx,
  // ): Promise<UserWithOrdersEntity>;

  abstract getList(db?: Tx): Promise<UserEntity[]>;

  abstract searchList(dto: UserSearchDTO, db?: Tx): Promise<UserEntity[]>;

  abstract create(user: UserCreateDTO, db?: Tx): Promise<UserEntity>;

  abstract update(dto: UserUpdateDTO, db?: Tx): Promise<UserEntity>;

  abstract remove(dto: UserRemoveDTO, db?: Tx): Promise<UserEntity>;
}
