import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { PropertyRemoveController } from "./_controller/propertyRemove.controller";
import { IPropertyRemoveTx } from "./_domain/transaction.type";
import { PropertyRemoveService } from "./_service/propertyRemove.service";
import { PropertyRemoveTx } from "./_tx/propertyRemove.transaction";

export const PropertyRemoveModule = new ContainerModule((bind) => {
  bind(IPropertyRemoveTx).to(PropertyRemoveTx);

  bind(PropertyRemoveService).toSelf();
  bind(Controller).to(PropertyRemoveController);
});
