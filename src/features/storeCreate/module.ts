import { ContainerModule } from "inversify";
import { IStoreCreateTx } from "./_domain/transaction.type";
import { StoreCreateTx } from "./_tx/storeCreate.transaction";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { StoreCreateController } from "./_controller/storeCreate.controller";
import { StoreCreateService } from "./_service/storeCreate.service";

export const StoreCreateModule = new ContainerModule((bind) => {
  bind(IStoreCreateTx).to(StoreCreateTx);

  bind(StoreCreateService).toSelf();

  bind(Controller).to(StoreCreateController);
});
