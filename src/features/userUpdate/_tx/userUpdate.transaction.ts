import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { UserUpdateTxDTO } from "../_domain/types";
import { IUserUpdateTx } from "../_domain/transaction.type";
import { UserEntity } from "@/kernel/domain/user/user.type";
import { IUserRepository } from "@/kernel/domain/user/repository.type";

@injectable()
export class UserUpdateTx extends Transaction implements IUserUpdateTx {
  constructor(
    readonly db: DBClient,
    private readonly userRepo: IUserRepository,
  ) {
    super(db);
  }

  async update(dto: UserUpdateTxDTO): Promise<UserEntity> {
    const { selector, userData } = dto;
    const action = async (tx: Tx) => {
      return await this.userRepo.update({ selector, data: userData }, tx);
    };

    return await this.start(action);
  }
}
