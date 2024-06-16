import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderRowRemoveController } from "./_controller/orderRowRemove.controller";
import { IOrderRowRemoveTx } from "./_domain/transaction.type";
import { OrderRowRemoveService } from "./_service/orderRemove.service";
import { OrderRowRemoveTx } from "./_tx/orderRowRemove.transaction";

export const OrderRowRemoveModule = new ContainerModule((bind) => {
  bind(IOrderRowRemoveTx).to(OrderRowRemoveTx);
  bind(OrderRowRemoveService).toSelf();

  bind(Controller).to(OrderRowRemoveController);
});
