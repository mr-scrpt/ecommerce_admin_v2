import { CartRepository } from "@/entities/cart/server";
import { UserDummyEntity, UserToRegistration } from "@/entities/user/user";
import { UserRepository } from "@/entities/user/user.server";
import { DBClient, Transaction, Tx, dbClient } from "@/shared/lib/db";
import { injectable } from "inversify";

@injectable()
export class UserRegistrationTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly userRepo: UserRepository,
    private readonly cartRepo: CartRepository,
  ) {
    super(dbClient);
  }

  async createUserRegistration(
    user: UserToRegistration,
  ): Promise<UserDummyEntity> {
    const action = async (tx: Tx) => {
      const userRegistered = await this.userRepo.registrationUser(user, tx);

      await this.cartRepo.createCart(
        {
          userId: userRegistered.id,
        },
        tx,
      );
      return userRegistered;
    };

    return await this.start(action);
  }
}
