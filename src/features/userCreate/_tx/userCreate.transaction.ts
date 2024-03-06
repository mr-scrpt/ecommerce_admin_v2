import { UserEntity, UserToCreate } from "@/entities/user/_domain/user.types";
import { UserRepository, userRepository } from "@/entities/user/user";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class UserCreateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly userRepo: UserRepository,
  ) {
    super(dbClient);
  }

  async createUser(user: UserToCreate): Promise<UserEntity> {
    const action = async (tx: Tx) => {
      return await this.userRepo.createUser(user, tx);
    };

    return await this.start(action);
  }
}

export const userCreateTx = new UserCreateTx(dbClient, userRepository);
