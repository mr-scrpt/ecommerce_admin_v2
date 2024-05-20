// import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { Container, ContainerModule, injectable } from "inversify";

export class BaseTransaction {
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

@injectable()
export class Transaction extends BaseTransaction {
  constructor(readonly db: DBClient) {
    super(db);
  }
}

const dbContainer = new Container();

export const DbModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
});

dbContainer.load(DbModule);
export { dbContainer };
