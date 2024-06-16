import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { ConsumerDataCreateController } from "./_controller/consumerData.controller";
import { IConsumerDataGetByOrderTx } from "./_domain/transaction.type";
import { ConsumerDataGetByOrderService } from "./_service/consumerDataGetByOrder.service";
import { ConsumerDataGetByOrderTx } from "./_tx/consumerDataGetByOrder.transaction";

export const ConsumerDataModule = new ContainerModule((bind) => {
  bind(IConsumerDataGetByOrderTx).to(ConsumerDataGetByOrderTx);
  bind(ConsumerDataGetByOrderService).toSelf();

  bind(Controller).to(ConsumerDataCreateController);
});
