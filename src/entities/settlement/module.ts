import { ContainerModule } from "inversify";
import { SettlementRepository } from "./_repository/settlement.repo";
import { SettlementInitService } from "./_service/settlementInit.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { SettlementController } from "./_controller/settlement.controller";
import { SettlementListSearchService } from "./_service/settlementListSearch.service";
import { ISettlementRepository } from "@/kernel/domain/settlement/repository.type";
import { SettlementAvailableListSearchService } from "./_service/settlementAvailableListSearch.service";
import { SettlementGetByRefService } from "./_service/settlementGet.service";

export const SettlementModule = new ContainerModule((bind) => {
  bind(ISettlementRepository).to(SettlementRepository);

  bind(SettlementInitService).toSelf();
  bind(SettlementGetByRefService).toSelf();
  bind(SettlementListSearchService).toSelf();
  bind(SettlementAvailableListSearchService).toSelf();

  bind(Controller).to(SettlementController);
});
