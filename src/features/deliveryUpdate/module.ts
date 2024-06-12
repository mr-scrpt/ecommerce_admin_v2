import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { IDeliveryUpdateTx } from "./_domain/transaction.type";
import { DeliveryUpdateService } from "./_service/deliveryUpdate.service";
import { DeliveryUpdateController } from "./_controller/deliveryUpdate.controller";
import { DeliveryUpdateTx } from "./_tx/deliveryUpdate.transaction";

export const OrderDeliveryUpdateModule = new ContainerModule((bind) => {
  bind(IDeliveryUpdateTx).to(DeliveryUpdateTx);
  bind(DeliveryUpdateService).toSelf();

  bind(Controller).to(DeliveryUpdateController);
});
