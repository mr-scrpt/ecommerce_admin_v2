import { API_BASE_URL, ApiClient } from "@/shared/lib/httpClient";
import { Container, ContainerModule } from "inversify";
import { API_NOVA_POSHTA_KEY, NovaPoshtaApi } from "./_api/novaposhta.api";
import { NovaPoshtaRepository } from "./_repository/novaposhta.repo";
import { SettlementRepository } from "./_repository/settlement.repo";
import { GetSettlementListSearchToSelectUseCase } from "./_usecase/getSettlementListSearchToSelect.usecase";
import { InitSettlementListUseCase } from "./_usecase/initSettlementList.usecase";
import { configPrivate } from "@/kernel/config/private.config";

export const settlementContainer = new Container();

export const SettlementModule = new ContainerModule((bind) => {
  bind(API_BASE_URL).toConstantValue(configPrivate.API_NOVA_POSHTA_URL);
  bind(API_NOVA_POSHTA_KEY).toConstantValue(configPrivate.API_NOVA_POSHTA_KEY);

  bind(ApiClient).toSelf();
  bind(NovaPoshtaApi).toSelf();

  bind(SettlementRepository).toSelf();
  bind(NovaPoshtaRepository).toSelf();

  bind(InitSettlementListUseCase).toSelf();
  bind(GetSettlementListSearchToSelectUseCase).toSelf();
});

settlementContainer.load(SettlementModule);
