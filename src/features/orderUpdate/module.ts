import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderUpdateController } from "./_controller/orderUpdate.controller";
import { IOrderUpdateTx } from "./_domain/transaction.type";
import { OrderUpdateService } from "./_service/orderUpdate.service";
import { OrderStatusUpdateTx } from "./_tx/orderUpdate.transaction";

export const OrderUpdateModule = new ContainerModule((bind) => {
  bind(IOrderUpdateTx).to(OrderStatusUpdateTx);

  bind(OrderUpdateService).toSelf();

  bind(Controller).to(OrderUpdateController);
});
