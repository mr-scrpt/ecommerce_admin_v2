import { ContainerModule } from "inversify";
import { ServiceUtils } from "./service.utils";

export const ServiceUtilsModule = new ContainerModule((bind) => {
  bind(ServiceUtils).toSelf();
});
