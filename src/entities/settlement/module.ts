import { configPrivate } from "@/shared/config/private.config";
import { DBClient, dbClient } from "@/shared/lib/db";
import { API_BASE_URL, ApiClient } from "@/shared/lib/httpClient";
import { Container, ContainerModule } from "inversify";
import { API_NOVA_POSHTA_KEY, NovaPoshtaApi } from "./_api/novaposhta.api";
import { SettlementRepository } from "./_repository/settlement.repo";
import { NovaPoshtaRepository } from "./_repository/novaposhta.repo";
import { InitSettlementListUseCase } from "./_usecase/initSettlementList.usecase";
import { GetSettlementListSearchToSelectUseCase } from "./_usecase/getSettlementListSearchToSelect.usecase";

const settlementContainer = new Container();

export const SettlementModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);

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

export default settlementContainer;
