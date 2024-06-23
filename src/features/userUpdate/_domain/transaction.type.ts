import { UserEntity } from "@/kernel/domain/user/user.type";
import { UserUpdateTxDTO } from "./types";

export abstract class IUserUpdateTx {
  abstract update(dto: UserUpdateTxDTO): Promise<UserEntity>;
}
