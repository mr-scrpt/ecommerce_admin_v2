import { ContainerModule } from "inversify";
import { ProfileUpdateController } from "./_controller/profileUpdate.controller";
import { ProfileUpdateService } from "./_service/profileUpdate.service";
import { ProfileUpdateTx } from "./_tx/profileUpdate.transaction";
import { Controller } from "@/kernel/lib/trpc/server";

export const ProfileUpdateModule = new ContainerModule((bind) => {
  bind(ProfileUpdateTx).toSelf();
  bind(ProfileUpdateService).toSelf();
  bind(Controller).to(ProfileUpdateController);
});
