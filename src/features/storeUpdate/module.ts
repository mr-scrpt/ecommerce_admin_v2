import { ContainerModule } from "inversify";
import { StoreUpdateTx } from "./_tx/storeUpdate.transaction";
import { IStoreUpdateTx } from "./_domain/transaction.type";
import { StoreUpdateService } from "./_service/storeUpdate.service";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { StoreUpdateController } from "./_controller/storeUpdate.controller";

export const StoreUpdateModule = new ContainerModule((bind) => {
  bind(IStoreUpdateTx).to(StoreUpdateTx);

  bind(StoreUpdateService).toSelf();

  bind(Controller).to(StoreUpdateController);
});
