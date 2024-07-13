import { IReceiverRepository } from "@/kernel/domain/receiver/repository.type";
import { ReceiverRepository } from "./_repository/receiver.repo";
import { Controller } from "@/kernel/lib/trpc/server";
import { ReceiverController } from "./_controller/receiver.controller";
import { ContainerModule } from "inversify";
import { ReceiverListGetByUserService } from "./_service/receiverListGetByUser.service";
import { ReceiverRelationGetService } from "./_service/receiverRelationGet.service";

export const ReceiverModule = new ContainerModule((bind) => {
  bind(IReceiverRepository).to(ReceiverRepository);
  bind(ReceiverListGetByUserService).toSelf();
  bind(ReceiverRelationGetService).toSelf();

  bind(Controller).to(ReceiverController);
});
