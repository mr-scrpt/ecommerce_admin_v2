import { type ILoggerConfig } from "@/shared/config/logger.config";
import { inject, injectable } from "inversify";
import pino, { Logger, TransportTargetOptions } from "pino";
import { ILoggerConfigFactory, LOGGER_TYPES, LoggerType } from "./type";

interface LoggerOptions {
  level: string;
  destination: string;
}

@injectable()
export class LoggerConfigFactory implements ILoggerConfigFactory {
  constructor(
    @inject(LOGGER_TYPES.LoggerConfig)
    readonly loggerConfig: ILoggerConfig,
  ) {}

  private readonly commonPrettyOptions = {
    colorize: this.loggerConfig.ERROR_LOG_COLORIZE,
    translateTime: this.loggerConfig.ERROR_LOG_TRANSLATE_TIME,
    ignore: this.loggerConfig.ERROR_LOG_IGNORE,
    messageFormat: this.loggerConfig.ERROR_LOG_MESSAGE_FORMAT,
  };

  private readonly loggerOptions: Record<LoggerType, LoggerOptions> = {
    [LoggerType.ERROR]: {
      level: this.loggerConfig.ERROR_LOG_LEVEL_ERROR,
      destination: this.loggerConfig.ERROR_LOG_DESTINATION_ERROR,
    },
    [LoggerType.ACCESS]: {
      level: this.loggerConfig.ACCESS_LOG_LEVEL_INFO,
      destination: this.loggerConfig.ACCESS_LOG_DESTINATION,
    },
  };

  private createTransportTargets(
    destination: string,
  ): TransportTargetOptions[] {
    return [
      {
        target: "pino/file",
        options: {
          destination: `${process.cwd()}/${destination}`,
        },
      },
      {
        target: "pino-pretty",
        options: this.commonPrettyOptions,
      },
    ];
  }

  getLogger(type: LoggerType): Logger {
    const options = this.loggerOptions[type];

    return pino({
      level: options.level,
      transport: {
        targets: this.createTransportTargets(options.destination),
      },
    });
  }
}
