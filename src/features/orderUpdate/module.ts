import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderUpdateController } from "./_controller/orderUpdate.controller";
import { IOrderStatusUpdateTx } from "./_domain/transaction.type";
import { OrderStatusUpdateService } from "./_service/orderStatusUpdate.service";
import { OrderStatusUpdateTx } from "./_tx/orderUpdate.transaction";

export const OrderUpdateModule = new ContainerModule((bind) => {
  bind(IOrderStatusUpdateTx).to(OrderStatusUpdateTx);

  bind(OrderStatusUpdateService).toSelf();

  bind(Controller).to(OrderUpdateController);
});
