import { ContainerModule } from "inversify";
import { IPropertyCreateTx } from "./_domain/transaction.type";
import { PropertyCreateTx } from "./_tx/propertyCreate.transaction";
import { PropertyCreateService } from "./_service/propertyCreate.service";
import { PropertyCreateController } from "./_controller/propertyCreate.controller";
import { Controller } from "@/kernel/lib/trpc/server";

export const PropertyCreateModule = new ContainerModule((bind) => {
  bind(IPropertyCreateTx).to(PropertyCreateTx);

  bind(PropertyCreateService).toSelf();
  bind(Controller).to(PropertyCreateController);
});
