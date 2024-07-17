import { ContainerModule } from "inversify";
import { StaffUpdateTx } from "./_tx/staffUpdate.transaction";
import { IStaffUpdateTx } from "./_domain/transaction.type";
import { StaffUpdateService } from "./_service/staffUpdate.service";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { StaffUpdateController } from "./_controller/staffUpdate.controller";

export const StaffUpdateModule = new ContainerModule((bind) => {
  bind(IStaffUpdateTx).to(StaffUpdateTx);

  bind(StaffUpdateService).toSelf();

  bind(Controller).to(StaffUpdateController);
});
