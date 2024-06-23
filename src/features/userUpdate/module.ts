import { ContainerModule } from "inversify";
import { UserUpdateTx } from "./_tx/userUpdate.transaction";
import { IUserUpdateTx } from "./_domain/transaction.type";
import { UserUpdateService } from "./_service/userUpdate.service";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { UserUpdateController } from "./_controller/userUpdate.controller";

export const UserUpdateModule = new ContainerModule((bind) => {
  bind(IUserUpdateTx).to(UserUpdateTx);

  bind(UserUpdateService).toSelf();

  bind(Controller).to(UserUpdateController);
});
