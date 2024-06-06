import { ContainerModule } from "inversify";
import { BASE_URL, HttpClient } from "./httpClient";
import { configPrivate } from "../config/private.config";

export const HttpClientModule = new ContainerModule((bind) => {
  // bind(BASE_URL).toConstantValue(configPrivate.API_NOVA_POSHTA_URL);
  bind(HttpClient).toSelf();
});
