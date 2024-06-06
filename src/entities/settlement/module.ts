import { ContainerModule } from "inversify";
import { NovaPoshtaApi } from "./_api/novaposhta.api";
import { NovaPoshtaRepository } from "./_repository/novaposhta.repo";
import { SettlementRepository } from "./_repository/settlement.repo";
import { SettlementInitService } from "./_service/settlementInit.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { SettlementController } from "./_controller/settlement.controller";

export const SettlementModule = new ContainerModule((bind) => {
  bind(NovaPoshtaApi).toSelf();

  bind(SettlementRepository).toSelf();
  bind(NovaPoshtaRepository).toSelf();

  bind(SettlementInitService).toSelf();

  bind(Controller).to(SettlementController);

  // bind(InitSettlementListUseCase).toSelf();
  // bind(GetSettlementListSearchToSelectUseCase).toSelf();
});
