import {
  UserRepository,
  userRepository,
} from "@/entities/user/_repository/user.repo";
import { UserId } from "@/entities/user/user";
import { dbClient } from "@/shared/lib/db";
import { PrismaClient } from "@prisma/client";

// export class UserRemoveTrs {
//   constructor(
//     private readonly userRepo: UserRepository
//   )
// }

export class Transaction {
  constructor(readonly prisma: PrismaService) {}

  async start<T>(callback: (tx: Tx) => Promise<T>): Promise<T> {
    const result = await this.prisma.$transaction(async (transaction) => {
      return await callback(transaction);
    });

    return result;
  }
}

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ["info"],
    });
  }
}
export type Tx = Omit<
  PrismaService,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

const prismaService = new PrismaService();

export class UserRemoveTx extends Transaction {
  constructor(
    readonly prisma: PrismaService,
    private readonly userRepo: UserRepository,
  ) {
    super(dbClient);
  }

  async removeUserById(userId: UserId) {
    const action = async (tx: Tx) => {
      await this.userRepo.removeUserById(userId, tx);
    };
    console.log("output_log: before remover in tx =>>>", userId);

    await this.start(action);
  }
}

export const userRemoveTx = new UserRemoveTx(prismaService, userRepository);
