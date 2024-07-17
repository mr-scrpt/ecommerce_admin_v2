import { ContainerModule } from "inversify";
import { IStaffRemoveTx } from "./_domain/transaction.type";
import { StaffRemoveTx } from "./_tx/staffRemove.transaction";
import { StaffRemoveService } from "./_service/staffRemove.service";
import { StaffRemoveController } from "./_controller/staffRemove.controller";
import { Controller } from "@/kernel/lib/trpc/server";

export const StaffRemoveModule = new ContainerModule((bind) => {
  bind(IStaffRemoveTx).to(StaffRemoveTx);

  bind(StaffRemoveService).toSelf();

  bind(Controller).to(StaffRemoveController);
});
