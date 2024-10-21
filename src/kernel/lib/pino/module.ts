import { ContainerModule } from "inversify";
import { LoggerImpl } from "./logger.impl";
import { ILogger } from "../../../shared/logger/logger.type";

export const LoggerModule = new ContainerModule((bind) => {
  bind(ILogger).to(LoggerImpl);
});
