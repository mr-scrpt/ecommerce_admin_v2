import { PrismaClient } from "@prisma/client";

export class Transaction {
  constructor(readonly db: DbClient) {}

  async start<T>(callback: (tx: Tx) => Promise<T>): Promise<T> {
    const result = await this.db.$transaction(async (transaction) => {
      return await callback(transaction);
    });

    return result;
  }
}

export class DbClient extends PrismaClient {
  constructor() {
    super({
      log: ["info"],
    });
  }
}

export type Tx = Omit<
  DbClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export const dbClient = new DbClient();
