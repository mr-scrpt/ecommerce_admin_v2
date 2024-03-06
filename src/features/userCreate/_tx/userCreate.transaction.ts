import { CartRepository, cartRepository } from "@/entities/cart/server";
import { UserEntity, UserToCreate } from "@/entities/user/_domain/user.types";
import { UserRepository, userRepository } from "@/entities/user/user";
import { DbClient, Transaction, Tx, dbClient } from "@/shared/lib/db";

export class UserCreateTx extends Transaction {
  constructor(
    readonly db: DbClient,
    private readonly userRepo: UserRepository,
    private readonly cartRepo: CartRepository,
  ) {
    super(dbClient);
  }

  async createUser(user: UserToCreate): Promise<UserEntity> {
    const action = async (tx: Tx) => {
      const userCreated = await this.userRepo.createUser(user, tx);
      console.log("output_log: userCreated =>>>", userCreated);
      await this.cartRepo.createCart(
        {
          userId: userCreated.id,
        },
        tx,
      );
      return userCreated;
    };

    return await this.start(action);
  }
}

export const userCreateTx = new UserCreateTx(
  dbClient,
  userRepository,
  cartRepository,
);
