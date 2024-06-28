import { UserEntity } from "@/kernel/domain/user/user.type";
import { DBClient, Transaction, Tx } from "@/shared/lib/db/db";
import { injectable } from "inversify";
import { UserCreateTxDTO } from "../_domain/types";
import { IUserCreateTx } from "../_domain/transaction.type";
import { IUserRepository } from "@/kernel/domain/user/repository.type";
import { UserWithCartEntity } from "@/entities/user/_domain/user.types";
import { ICartRepository } from "@/kernel/domain/cart/repository.type";

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
      const userCreated = await this.userRepo.create({ data: userData }, tx);

      await this.cartRepo.create(
        {
          data: {
            userId: userCreated.id,
          },
        },
        tx,
      );
      const userWithCart = await this.userRepo.getWithCart<UserWithCartEntity>(
        { id: userCreated.id },
        tx,
      );

      return userWithCart;
    };

    return await this.start(action);
  }
}
