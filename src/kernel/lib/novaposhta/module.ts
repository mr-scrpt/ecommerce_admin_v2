import { ContainerModule } from "inversify";
import { API_NOVA_POSHTA_KEY, NovaPoshtaApi } from "./novaposhta.api";
import { NovaPoshtaRepository } from "./novaposhta.repo";
import { configPrivate } from "@/shared/config/private.config";
import { BASE_URL } from "@/shared/api/httpClient";

export const NovaPoshtaModule = new ContainerModule((bind) => {
  bind(BASE_URL).toConstantValue(configPrivate.API_NOVA_POSHTA_URL);
  bind(API_NOVA_POSHTA_KEY).toConstantValue(configPrivate.API_NOVA_POSHTA_KEY);
  bind(NovaPoshtaApi).toSelf();
  bind(NovaPoshtaRepository).toSelf();
});
