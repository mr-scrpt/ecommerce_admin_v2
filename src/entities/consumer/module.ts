import { IConsumerRepository } from "@/kernel/domain/consumer/repository.type";
import { Controller } from "@/kernel/lib/trpc/server";
import { ContainerModule } from "inversify";
import { ConsumerRepository } from "./_repository/consumer.repo";
import { ConsumerController } from "./_controller/consumer.controller";
import { ConsumerRelationGetByOrderService } from "./_service/consumerRelationGetByOrder.service";
import { ConsumerListSearchService } from "./_service/consumerListSearch.service";
import { ConsumerListService } from "./_service/consumerList.service";
import { ConsumerGetService } from "./_service/consumerGet.service";

export const ConsumerModule = new ContainerModule((bind) => {
  bind(IConsumerRepository).to(ConsumerRepository);

  bind(ConsumerGetService).toSelf();
  bind(ConsumerListService).toSelf();
  bind(ConsumerListSearchService).toSelf();
  bind(ConsumerRelationGetByOrderService).toSelf();

  bind(Controller).to(ConsumerController);
});
