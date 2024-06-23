import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderRowUpdateController } from "./_controller/orderRowUpdate.controller";
import { IOrderRowUpdateTx } from "./_domain/transaction.type";
import { OrderRowUpdateService } from "./_service/orderRowUpdate.service";
import { OrderRowUpdateTx } from "./_tx/orderRowUpdate.transaction";

export const OrderRowUpdateModule = new ContainerModule((bind) => {
  bind(IOrderRowUpdateTx).to(OrderRowUpdateTx);

  bind(OrderRowUpdateService).toSelf();

  bind(Controller).to(OrderRowUpdateController);
});
