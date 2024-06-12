import { ContainerModule } from "inversify";
import { ProductRemoveTx } from "./_tx/productRemove.transaction";
import { IProductRemoveTx } from "./_domain/transaction.type";
import { ProductRemoveService } from "./_service/productRemove.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { ProductRemoveController } from "./_controller/productRemove.controller";

export const ProductRemoveModule = new ContainerModule((bind) => {
  bind(IProductRemoveTx).to(ProductRemoveTx);

  bind(ProductRemoveService).toSelf();
  bind(Controller).to(ProductRemoveController);
});
