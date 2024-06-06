import { ContainerModule } from "inversify";
import { SettlementRepository } from "./_repository/settlement.repo";
import { SettlementInitService } from "./_service/settlementInit.service";
import { Controller } from "@/kernel/lib/trpc/server";
import { SettlementController } from "./_controller/settlement.controller";

export const SettlementModule = new ContainerModule((bind) => {
  bind(SettlementRepository).toSelf();

  bind(SettlementInitService).toSelf();

  bind(Controller).to(SettlementController);
});
