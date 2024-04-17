import { DBClient, dbClient } from "@/shared/lib/db";
import { API_BASE_URL, ApiClient } from "@/shared/lib/httpClient";
import { Container, ContainerModule } from "inversify";
import { API_NOVA_POSHTA_KEY, NovaPoshtaApi } from "./_api/novaposhta.api";
import { DeliveryRepository } from "./_repository/delivery.repo";
import { NovaPoshtaRepository } from "./_repository/novaposhta.repo";
import { GetDeliveryUseCase } from "./_usecase/getDelivery.usecase";
import { GetDeliveryListUseCase } from "./_usecase/getDeliveryList.usecase";
import { GetDeliveryByOrderIdUseCase } from "./_usecase/getDeliveryOrderId.usecase";
import { GetSettlementListSearchToSelectUseCase } from "./_usecase/getSettlementListSearchToSelect.usecase";
import { configPrivate } from "@/shared/config/private.config";
import { SettlementRepository } from "./_repository/settlement.repo";
import { InitSettlementListUseCase } from "./_usecase/initSettlementList.usecase";

const deliveryContainer = new Container();

export const DeliveryModule = new ContainerModule((bind) => {
  bind(DBClient).toConstantValue(dbClient);

  bind(API_BASE_URL).toConstantValue(configPrivate.API_NOVA_POSHTA_URL);
  bind(API_NOVA_POSHTA_KEY).toConstantValue(configPrivate.API_NOVA_POSHTA_KEY);

  bind(ApiClient).toSelf();
  bind(NovaPoshtaApi).toSelf();

  bind(DeliveryRepository).toSelf();
  bind(NovaPoshtaRepository).toSelf();
  bind(SettlementRepository).toSelf();

  bind(GetDeliveryListUseCase).toSelf();
  bind(GetDeliveryUseCase).toSelf();
  bind(GetDeliveryByOrderIdUseCase).toSelf();
  bind(GetSettlementListSearchToSelectUseCase).toSelf();

  bind(InitSettlementListUseCase).toSelf();
});

deliveryContainer.load(DeliveryModule);

export default deliveryContainer;
