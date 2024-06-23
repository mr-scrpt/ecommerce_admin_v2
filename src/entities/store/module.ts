import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { StoreController } from "./_controller/store.controller";
import { IStoreRepository } from "./_domain/repository.type";
import { StoreRepository } from "./_repository/store.repo";
import { StoreGetService } from "./_service/storeGet.service";
import { StoreListGetBySettlementRefService } from "./_service/storeListGetBySettlementRef.service";
import { StoreListGetService } from "./_service/storeListGet.service";
import { StoreListWithRelationGetService } from "./_service/storeListWithRelationGet.service";
import { StoreListGetBySettlementRefWithRelationService } from "./_service/storeListGetBySettlementRefWithRelation.service";

export const StoreModule = new ContainerModule((bind) => {
  bind(IStoreRepository).to(StoreRepository);

  bind(StoreGetService).toSelf();
  bind(StoreListGetBySettlementRefService).toSelf();
  bind(StoreListGetService).toSelf();
  bind(StoreListWithRelationGetService).toSelf();
  bind(StoreListGetBySettlementRefWithRelationService).toSelf();

  bind(Controller).to(StoreController);
});
