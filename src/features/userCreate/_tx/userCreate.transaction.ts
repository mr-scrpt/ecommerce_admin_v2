import { IUserRepository } from "@/entities/user/user.server";
import { UserEntity } from "@/kernel/domain/user.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { UserCreateTxDTO } from "../_domain/types";
import { ICartRepository } from "@/entities/cart/server";
import { IUserCreateTx } from "../_domain/transaction.type";

@injectable()
export class UserCreateTx extends Transaction implements IUserCreateTx {
  constructor(
    readonly db: DBClient,
    readonly userRepo: IUserRepository,
    readonly cartRepo: ICartRepository,
  ) {
    super(db);
  }

  async createUser(dto: UserCreateTxDTO): Promise<UserEntity> {
    const { userData } = dto;
    const action = async (tx: Tx) => {
      const userCreated = await this.userRepo.create(
        { data: userData },
        tx,
      );

      await this.cartRepo.create(
        {
          data: {
            userId: userCreated.id,
          },
        },
        tx,
      );
      const userWithCart = await this.userRepo.getWithCart(
        { id: userCreated.id },
        tx,
      );

      return userWithCart;
    };

    return await this.start(action);
  }
}
