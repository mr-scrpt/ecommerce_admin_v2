import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { UserUpdateComplexible } from "../_domain/types";
import { UserEntity } from "@/entities/user/user";
import { IUserRepository } from "@/entities/user/user.server";

@injectable()
export class UserUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly userRepo: IUserRepository,
  ) {
    super(db);
  }

  async updateUser(userToUpdate: UserUpdateComplexible): Promise<UserEntity> {
    const { userId, userData } = userToUpdate;
    const action = async (tx: Tx) => {
      return await this.userRepo.update(userId, userData, tx);
    };

    return await this.start(action);
  }
}
