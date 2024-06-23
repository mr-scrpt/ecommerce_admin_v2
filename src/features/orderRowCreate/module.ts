import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderRowCreateController } from "./_controller/orderRowCreate.controller";
import { IOrderRowCreateTx } from "./_domain/transaction.type";
import { OrderRowCreateService } from "./_service/orderRowCreate.service";
import { OrderRowCreateTx } from "./_tx/orderRowCreate.transaction";

export const OrderRowCreateModule = new ContainerModule((bind) => {
  bind(IOrderRowCreateTx).to(OrderRowCreateTx);

  bind(OrderRowCreateService).toSelf();

  bind(Controller).to(OrderRowCreateController);
});
