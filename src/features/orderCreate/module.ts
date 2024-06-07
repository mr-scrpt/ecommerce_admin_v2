import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { OrderCreateController } from "./_controller/orderCreate.controller";
import { OrderEmptyCreateService } from "./_service/orderCreateEmpty.service";
import { OrderCreateTx } from "./_tx/orderCreate.transaction";

export const OrderCreateModule = new ContainerModule((bind) => {
  bind(OrderCreateTx).toSelf();

  bind(OrderEmptyCreateService).toSelf();
  bind(Controller).to(OrderCreateController);
});
