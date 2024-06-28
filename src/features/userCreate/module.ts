import { IUserCreateService } from "@/kernel/lib/nextauth/type";
import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { UserCreateController } from "./_controller/userCreate.controller";
import { UserCreateService } from "./_service/userCreate.service";
import { UserCreateTx } from "./_tx/userCreate.transaction";
import { IUserCreateTx } from "./_domain/transaction.type";

export const UserCreateModule = new ContainerModule((bind) => {
  // bind(UserCreateTx).toSelf();
  bind(IUserCreateService).to(UserCreateService);
  bind(IUserCreateTx).to(UserCreateTx);
  bind(Controller).to(UserCreateController);
});
