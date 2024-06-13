import { ContainerModule } from "inversify";
import { SettlementRepository } from "./_repository/settlement.repo";
import { SettlementInitService } from "./_service/settlementInit.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { SettlementController } from "./_controller/settlement.controller";
import { ISettlementRepository } from "./_domain/repository.type";
import { SettlementListSearchService } from "./_service/settlementListSearch.service";

export const SettlementModule = new ContainerModule((bind) => {
  bind(ISettlementRepository).to(SettlementRepository);

  bind(SettlementInitService).toSelf();
  bind(SettlementListSearchService).toSelf();

  bind(Controller).to(SettlementController);
});
