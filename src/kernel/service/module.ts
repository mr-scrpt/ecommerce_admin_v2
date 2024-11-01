import { ContainerModule } from "inversify";
import { UtilsService } from "./service.utils";
import { CheckService } from "./service.check";
import { ICheckService, IUtilsService } from "./type";

export const ServiceUtilsModule = new ContainerModule((bind) => {
  bind(IUtilsService).to(UtilsService);
  bind(ICheckService).to(CheckService);
});
