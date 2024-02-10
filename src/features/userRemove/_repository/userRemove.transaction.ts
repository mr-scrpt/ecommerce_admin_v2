import { UserEntity } from "@/entities/user/_domain/types";
import { UserRepository, userRepository } from "@/entities/user/user";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { UserId } from "@/shared/lib/user";

export class UserRemoveTx extends Transaction {
  constructor(
    readonly db: DbClient,
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

export const userRemoveTx = new UserRemoveTx(dbClient, userRepository);
