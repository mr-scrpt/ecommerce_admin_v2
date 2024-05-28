import { CartRepository } from "@/entities/cart/server";
import { UserToCreate } from "@/entities/user/user.server";
import { UserRepository } from "@/entities/user/user.server";
import { UserEntity } from "@/kernel/domain/user.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";

@injectable()
export class UserCreateTx extends Transaction {
  constructor(
    readonly db: DBClient,
    private readonly userRepo: UserRepository,
    private readonly cartRepo: CartRepository,
  ) {
    super(db);
  }

  async createUser(user: UserToCreate): Promise<UserEntity> {
    const action = async (tx: Tx) => {
      const userCreated = await this.userRepo.createUser(user, tx);
      await this.cartRepo.createCart(
        {
          userId: userCreated.id,
        },
        tx,
      );
      const userWithCart = await this.userRepo.getUserWithCart(
        { userId: userCreated.id },
        tx,
      );

      return userWithCart;
    };

    return await this.start(action);
  }
}
