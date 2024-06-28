import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { ConsumerCreateController } from "./_controller/consumerCreate.controller";
import { IConsumerCreateTx } from "./_domain/transaction.type";
import { ConsumerCreateService } from "./_service/consumerCreate.service";
import { ConsumerCreateTx } from "./_tx/consumerCreate.transaction";

export const ConsumerCreateModule = new ContainerModule((bind) => {
  bind(IConsumerCreateTx).to(ConsumerCreateTx);

  bind(ConsumerCreateService).toSelf();

  bind(Controller).to(ConsumerCreateController);
});
