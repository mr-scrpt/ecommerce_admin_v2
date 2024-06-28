import { ContainerModule } from "inversify";
import { ConsumerUpdateTx } from "./_tx/consumerUpdate.transaction";
import { IConsumerUpdateTx } from "./_domain/transaction.type";
import { ConsumerUpdateService } from "./_service/consumerUpdate.service";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { ConsumerUpdateController } from "./_controller/consumerUpdate.controller";

export const ConsumerUpdateModule = new ContainerModule((bind) => {
  bind(IConsumerUpdateTx).to(ConsumerUpdateTx);

  bind(ConsumerUpdateService).toSelf();

  bind(Controller).to(ConsumerUpdateController);
});
