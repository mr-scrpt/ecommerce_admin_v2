import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { IStoreRemoveTx } from "./_domain/transaction.type";
import { StoreRemoveService } from "./_service/storeRemove.service";
import { StoreRemoveTx } from "./_tx/storeRemove.transaction";
import { StoreRemoveController } from "./_controller/storeRemove.controller";

export const StoreRemoveModule = new ContainerModule((bind) => {
  bind(IStoreRemoveTx).to(StoreRemoveTx);
  bind(StoreRemoveService).toSelf();
  bind(Controller).to(StoreRemoveController);
});
