import { IStoreRepository } from "@/kernel/domain/store/repository.type";
import { Controller } from "@/kernel/lib/trpc/_controller";
import { ContainerModule } from "inversify";
import { StoreController } from "./_controller/store.controller";
import { StoreRepository } from "./_repository/store.repo";
import { StoreGetService } from "./_service/storeGet.service";
import { StoreListGetService } from "./_service/storeListGet.service";
import { StoreListGetBySettlementRefService } from "./_service/storeListGetBySettlementRef.service";
import { StoreListGetBySettlementRefWithRelationService } from "./_service/storeListGetBySettlementRefWithRelation.service";
import { StoreListWithRelationGetService } from "./_service/storeListWithRelationGet.service";
import { StoreWithRelationGetService } from "./_service/storeGetWithRelation.service";

export const StoreModule = new ContainerModule((bind) => {
  bind(IStoreRepository).to(StoreRepository);

  bind(StoreGetService).toSelf();
  bind(StoreWithRelationGetService).toSelf();
  bind(StoreListGetBySettlementRefService).toSelf();
  bind(StoreListGetService).toSelf();
  bind(StoreListWithRelationGetService).toSelf();
  bind(StoreListGetBySettlementRefWithRelationService).toSelf();

  bind(Controller).to(StoreController);
});
