import { PrismaClient } from "@prisma/client";

export class Transaction {
  constructor(readonly db: DBClient) {}

  async start<T>(callback: (tx: Tx) => Promise<T>): Promise<T> {
    const result = await this.db.$transaction(async (transaction) => {
      return await callback(transaction);
    });

    return result;
  }
}

export class DBClient extends PrismaClient {
  constructor() {
    super({
      log: ["info"],
    });
  }
}

export type Tx = Omit<
  DBClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export const dbClient = new DBClient();
