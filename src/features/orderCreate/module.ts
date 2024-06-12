import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderCreateController } from "./_controller/orderCreate.controller";
import { OrderEmptyCreateService } from "./_service/orderCreateEmpty.service";
import { OrderCreateTx } from "./_tx/orderCreate.transaction";
import { IOrderCreateTx } from "./_domain/transaction.type";

export const OrderCreateModule = new ContainerModule((bind) => {
  bind(IOrderCreateTx).to(OrderCreateTx);

  bind(OrderEmptyCreateService).toSelf();
  bind(Controller).to(OrderCreateController);
});
