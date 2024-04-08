import { UserEntity } from "@/entities/user/_domain/user.types";
import { UserRepository } from "@/entities/user/user.server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { UserId } from "@/shared/lib/user";
import { injectable } from "inversify";

@injectable()
export class UserRemoveTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly userRepo: UserRepository,
  ) {
    super(dbClient);
  }

  async removeUserById(userId: UserId): Promise<UserEntity> {
    const action = async (tx: Tx) => {
      return await this.userRepo.removeUserById(userId, tx);
    };

    return await this.start(action);
  }
}
