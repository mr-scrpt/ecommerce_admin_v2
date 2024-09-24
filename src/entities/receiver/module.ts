import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { ReceiverController } from "./_controller/receiver.controller";
import { ReceiverRepository } from "./_repository/receiver.repo";
import { ReceiverListGetByUserService } from "./_service/receiverListGetByUser.service";
import { ReceiverRelationGetService } from "./_service/receiverRelationGet.service";

export const ReceiverModule = new ContainerModule((bind) => {
  bind(IReceiverRepository).to(ReceiverRepository);
  bind(ReceiverListGetByUserService).toSelf();
  bind(ReceiverRelationGetService).toSelf();
  // bind(ReceiverListGetByOrderService).toSelf();

  bind(Controller).to(ReceiverController);
});
