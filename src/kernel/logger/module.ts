import { ILoggerConfig, loggerConfig } from "@/shared/config/logger.config";
import { ContainerModule } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "./di";
import { LoggerFactory } from "./factory";
import { ErrorLogFormatter } from "./formatter";
import { Logger } from "./logger";
import { loggerConfigStrategies } from "./strategies";
import { SizeBasedRotationStrategy } from "./strategies/rotate.strategy";
import { FileLogTransport } from "./transport";
import {
  ILogFormatter,
  ILogTransport,
  ILogger,
  ILoggerConfigStrategy,
  ILoggerFactory,
  ILoggerProvider,
  IRotationStrategy,
} from "./types";
import { PinoLoggerProvider } from "./provider";

export const LoggerModule = new ContainerModule((bind) => {
  bind<ILoggerConfig>(LOGGER_INJECTION_TOKENS.LoggerConfig).toConstantValue(
    loggerConfig,
  );
  bind<ILogger>(LOGGER_INJECTION_TOKENS.Logger).to(Logger);
  bind<ILogFormatter>(LOGGER_INJECTION_TOKENS.LogFormatter).to(
    ErrorLogFormatter,
  );
  bind<ILogTransport>(LOGGER_INJECTION_TOKENS.LogTransport).to(
    FileLogTransport,
  );

  bind<IRotationStrategy>(LOGGER_INJECTION_TOKENS.RotationStrategy)
    .to(SizeBasedRotationStrategy)
    .inSingletonScope();

  Array.from(loggerConfigStrategies.entries()).forEach(([_, StrategyClass]) => {
    bind<ILoggerConfigStrategy>(StrategyClass).toSelf();
  });

  bind<ILoggerFactory>(LOGGER_INJECTION_TOKENS.LoggerFactory).to(LoggerFactory);
  bind<ILoggerProvider>(LOGGER_INJECTION_TOKENS.LoggerProvider).to(
    PinoLoggerProvider,
  );
});
