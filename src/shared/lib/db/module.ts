import { ContainerModule } from "inversify";
import { BaseTransaction, DBClient, Transaction } from "./db";
import { dbClient } from "./instans";

export const DbModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);
  bind(BaseTransaction).toSelf();
  bind(Transaction).toSelf();
});
