import { ContainerModule } from "inversify";
import { ProfileUpdateController } from "./_controller/profileUpdate.controller";
import { ProfileUpdateService } from "./_service/profileUpdate.service";
import { ProfileUpdateTx } from "./_tx/profileUpdate.transaction";
import { Controller } from "@/kernel/lib/trpc/server";
import { IProfileUpdateTx } from "./_domain/transaction.type";

export const ProfileUpdateModule = new ContainerModule((bind) => {
  bind(IProfileUpdateTx).to(ProfileUpdateTx);

  bind(ProfileUpdateService).toSelf();

  bind(Controller).to(ProfileUpdateController);
});
