import { ContainerModule } from "inversify";
import { IConsumerRemoveTx } from "./_domain/transaction.type";
import { ConsumerRemoveTx } from "./_tx/consumerRemove.transaction";
import { ConsumerRemoveService } from "./_service/consumerRemove.service";
import { ConsumerRemoveController } from "./_controller/consumerRemove.controller";
import { Controller } from "@/kernel/lib/trpc/server";

export const ConsumerRemoveModule = new ContainerModule((bind) => {
  bind(IConsumerRemoveTx).to(ConsumerRemoveTx);

  bind(ConsumerRemoveService).toSelf();

  bind(Controller).to(ConsumerRemoveController);
});
