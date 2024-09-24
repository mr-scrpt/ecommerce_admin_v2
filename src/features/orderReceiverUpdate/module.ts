import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { IOrderReceiverUpdateTx } from "./_domain/transaction.type";
import { OrderReceiverUpdateTx } from "./_tx/orderReceiverUpdate.transaction";
import { OrderReceiverUpdateService } from "./_service/orderReceiverUpdate.service";
import { OrderReceiverUpdateController } from "./_controller/orderReceiverUpdate.controller";

export const OrderReceiverUpdateModule = new ContainerModule((bind) => {
  bind(IOrderReceiverUpdateTx).to(OrderReceiverUpdateTx);

  bind(OrderReceiverUpdateService).toSelf();

  bind(Controller).to(OrderReceiverUpdateController);
});
