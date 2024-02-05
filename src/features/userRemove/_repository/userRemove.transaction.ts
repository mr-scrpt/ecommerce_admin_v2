import { UserId, UserRepository, userRepository } from "@/entities/user/user";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class UserRemoveTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly userRepo: UserRepository,
  ) {
    super(dbClient);
  }

  async removeUserById(userId: UserId) {
    const action = async (tx: Tx) => {
      await this.userRepo.removeUserById(userId, tx);
    };

    await this.start(action);
  }
}

export const userRemoveTx = new UserRemoveTx(dbClient, userRepository);
