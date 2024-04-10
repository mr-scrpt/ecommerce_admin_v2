import { CartRepository } from "@/entities/cart/server";
import { UserWithCartEntity } from "@/entities/user/_domain/user.types";
import { UserRepository, UserToCreate } from "@/entities/user/user.server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { injectable } from "inversify";

@injectable()
export class UserCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly userRepo: UserRepository,
    private readonly cartRepo: CartRepository,
  ) {
    super(dbClient);
  }

  async createUser(user: UserToCreate): Promise<UserWithCartEntity> {
    const action = async (tx: Tx) => {
      const userCreated = await this.userRepo.createUser(user, tx);
      await this.cartRepo.createCart(
        {
          userId: userCreated.id,
        },
        tx,
      );

      const userWithCart = await this.userRepo.getUserWithCart(
        userCreated.id,
        tx,
      );

      return userWithCart;
    };

    return await this.start(action);
  }
}
