import { Container, inject, injectable } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "./di";
import { Logger } from "./logger";
import { loggerConfigStrategies } from "./strategies";
import { FileLogTransport } from "./transport";
import type {
  ILogFormatter,
  ILogger,
  ILoggerFactory,
  ILoggerProvider,
  IRotationStrategy,
  LoggerType,
} from "./types";
import type { ILoggerConfig } from "@/shared/config/logger.config";

@injectable()
export class LoggerFactory implements ILoggerFactory {
  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LogFormatter)
    private formatter: ILogFormatter,
    @inject(LOGGER_INJECTION_TOKENS.LoggerConfig)
    private config: ILoggerConfig,
    @inject(LOGGER_INJECTION_TOKENS.RotationStrategy)
    private rotationStrategy: IRotationStrategy,
    @inject(LOGGER_INJECTION_TOKENS.LoggerProvider)
    private loggerProvider: ILoggerProvider,
  ) {}

  createLogger(type: LoggerType): ILogger {
    const ConfigStrategyClass = loggerConfigStrategies.get(type);

    if (!ConfigStrategyClass) {
      throw new Error(`Unsupported logger type: ${type}`);
    }

    // Создаем стратегию напрямую, передавая конфиг
    const configStrategy = new ConfigStrategyClass(this.config);

    const transport = new FileLogTransport(
      this.rotationStrategy,
      configStrategy.getDestination(),
      configStrategy.getOptions(),
      this.loggerProvider,
    );

    return new Logger(this.formatter, transport);
  }
}

// @injectable()
// export class LoggerFactory implements ILoggerFactory {
//   constructor(
//     @inject(LOGGER_INJECTION_TOKENS.LogFormatter)
//     private formatter: ILogFormatter,
//     @inject(LOGGER_INJECTION_TOKENS.Container)
//     private container: Container,
//     @inject(LOGGER_INJECTION_TOKENS.RotationStrategy)
//     private rotationStrategy: IRotationStrategy,
//     @inject(LOGGER_INJECTION_TOKENS.LoggerProvider)
//     private loggerProvider: ILoggerProvider,
//   ) {}
//
//   createLogger(type: LoggerType): ILogger {
//     const ConfigStrategyClass = loggerConfigStrategies.get(type);
//
//     if (!ConfigStrategyClass) {
//       throw new Error(`Unsupported logger type: ${type}`);
//     }
//
//     const configStrategy = this.container.resolve(ConfigStrategyClass);
//
//     const transport = new FileLogTransport(
//       this.rotationStrategy,
//       configStrategy.getDestination(),
//       configStrategy.getOptions(),
//       this.loggerProvider,
//     );
//
//     return new Logger(this.formatter, transport);
//   }
// }
