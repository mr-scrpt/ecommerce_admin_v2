import { Controller } from "@/kernel/lib/trpc/server";
import { BASE_URL } from "@/shared/api/httpClient";
import { configPrivate } from "@/shared/config/private.config";
import { ContainerModule } from "inversify";
import { API_NOVA_POSHTA_KEY, NovaPoshtaApi } from "./_api/novaposhta.api";
import { DeliveryController } from "./_controller/delivery.controller";
import { DeliveryRepository } from "./_repository/delivery.repo";
import { NovaPoshtaRepository } from "./_repository/novaposhta.repo";
import { DeliveryGetService } from "./_service/deliveryGet.service";
import { DeliveryListGetService } from "./_service/deliveryListGet.service";
import { DeliveryGetOrderService } from "./_service/deliveryGetOrder.service";

export const DeliveryModule = new ContainerModule((bind) => {
  bind(BASE_URL).toConstantValue(configPrivate.API_NOVA_POSHTA_URL);
  bind(API_NOVA_POSHTA_KEY).toConstantValue(configPrivate.API_NOVA_POSHTA_KEY);

  // bind(ApiClient).toSelf();
  bind(NovaPoshtaApi).toSelf();

  bind(DeliveryRepository).toSelf();
  bind(NovaPoshtaRepository).toSelf();

  bind(DeliveryGetService).toSelf();
  bind(DeliveryGetOrderService).toSelf();
  bind(DeliveryListGetService).toSelf();

  bind(Controller).to(DeliveryController);

  // bind(GetDeliveryListUseCase).toSelf();
  // bind(GetDeliveryUseCase).toSelf();
  // bind(GetDeliveryByOrderIdUseCase).toSelf();
  // bind(GetPostOfficeListToSelectUseCase).toSelf();
});
