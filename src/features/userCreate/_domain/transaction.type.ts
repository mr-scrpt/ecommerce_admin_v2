import { UserEntity } from "@/kernel/domain/user/user.type";
import { DBClient, Transaction } from "@/shared/lib/db/db";
import { UserCreateTxDTO } from "./types";

export abstract class IUserCreateTx extends Transaction {
  constructor(readonly db: DBClient) {
    super(db);
  }

  abstract createUser(dto: UserCreateTxDTO): Promise<UserEntity>;
}
