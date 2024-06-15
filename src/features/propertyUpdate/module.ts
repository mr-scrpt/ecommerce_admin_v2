import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { PropertyUpdateController } from "./_controller/propertyUpdate.controller";
import { IPropertyUpdateTx } from "./_domain/transaction.type";
import { PropertyUpdateService } from "./_service/propertyUpdate.service";
import { PropertyUpdateTx } from "./_tx/propertyUpdate.transaction";

export const PropertyUpdateModule = new ContainerModule((bind) => {
  bind(IPropertyUpdateTx).to(PropertyUpdateTx);

  bind(PropertyUpdateService).toSelf();
  bind(Controller).to(PropertyUpdateController);
});
