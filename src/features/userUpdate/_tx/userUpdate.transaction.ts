import { UserRepository } from "@/entities/user/user.server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { injectable } from "inversify";
import { UserUpdateComplexible } from "../_domain/types";
import { UserEntity } from "@/entities/user/user";

@injectable()
export class UserUpdateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly userRepo: UserRepository,
  ) {
    super(dbClient);
  }

  async updateUser(userToUpdate: UserUpdateComplexible): Promise<UserEntity> {
    const { userId, userData } = userToUpdate;
    const action = async (tx: Tx) => {
      return await this.userRepo.updateUser(userId, userData, tx);
    };

    return await this.start(action);
  }
}
