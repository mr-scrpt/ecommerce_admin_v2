import { DBClient, Tx } from "@/shared/lib/db/db";
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

export abstract class IUserRepository {
  constructor(readonly db: DBClient) {}

  abstract getUser(dto: UserGetDTO, db?: Tx): Promise<UserEntity>;

  abstract getUserWithCart(
    dto: UserGetDTO,
    db?: Tx,
  ): Promise<UserWithCartEntity>;

  abstract getUserWithOrderList(
    dto: UserGetDTO,
    db?: Tx,
  ): Promise<UserWithOrdersEntity>;

  abstract getUserList(db?: Tx): Promise<UserEntity[]>;

  abstract getUserListSearch(
    dto: UserSearchDTO,
    db?: Tx,
  ): Promise<UserEntity[]>;

  abstract createUser(user: UserCreateDTO, db?: Tx): Promise<UserEntity>;

  abstract updateUser(dto: UserUpdateDTO, db?: Tx): Promise<UserEntity>;

  abstract removeUserById(dto: UserRemoveDTO, db?: Tx): Promise<UserEntity>;
}
