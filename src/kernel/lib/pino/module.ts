import { ContainerModule } from "inversify";
import { LoggerImpl } from "./logger.impl";
import { ILogger } from "../../../shared/logger/logger.type";
import { LoggerConfigFactory } from "./logger.factory";
import { ILoggerConfig, loggerConfig } from "@/shared/config/logger.config";
import { type ILoggerConfigFactory, LOGGER_TYPES } from "./type";

export const LoggerModule = new ContainerModule((bind) => {
  bind<ILoggerConfig>(LOGGER_TYPES.LoggerConfig).toConstantValue(loggerConfig);

  bind<ILoggerConfigFactory>(LOGGER_TYPES.LoggerConfigFactory).to(
    LoggerConfigFactory,
  );

  bind<ILogger>(LOGGER_TYPES.Logger).to(LoggerImpl);
});
