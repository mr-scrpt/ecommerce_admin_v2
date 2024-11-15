import { CONFIG_INJECTION_TOKENS } from "@/shared/config/di";
// import type { TLoggerConfig } from "@/shared/config/logger.config";
import type {
  ILoggerConfig,
  LoggerConfigBase,
} from "@/shared/config/logger.config";
import { IErrorAdapterResult } from "@/shared/error/type";
import { inject, injectable } from "inversify";
import path from "node:path";
import pino from "pino";
import { LOGGER_INJECTION_TOKENS } from "../../domain/di";
import { IFileLoggerConfig, ILoggerAdapter } from "../../domain/types";

@injectable()
export class PinoFileLoggerAdapter implements ILoggerAdapter {
  private errorLogger: pino.Logger;
  private accessLogger: pino.Logger;

  constructor(
    @inject(CONFIG_INJECTION_TOKENS.LOGGER_CONFIG)
    private readonly config: ILoggerConfig,

    @inject(LOGGER_INJECTION_TOKENS.PinoInstance)
    private readonly pinoInstance: typeof pino,
  ) {
    // console.log("CONFIG IN CONSTRUCTOR PINO FILE", this.config);
    const errorFileConfig = this.createFileConfig({
      filename: config.ERROR_LOG_FILENAME,
      level: config.ERROR_LOG_LEVEL_ERROR,
    });

    const accessFileConfig = this.createFileConfig({
      filename: config.ACCESS_LOG_FILENAME,
      level: config.ACCESS_LOG_LEVEL_INFO,
    });

    this.errorLogger = this.createLogger(errorFileConfig);
    this.accessLogger = this.createLogger(accessFileConfig);
  }

  private createFileConfig(specificConfig: {
    filename: string;
    level: string;
  }): IFileLoggerConfig {
    return {
      filename: specificConfig.filename,
      directory: this.config.ERROR_LOG_DESTINATION_CATALOG,
      maxSize: this.config.ERROR_LOG_MAX_SIZE,
      level: specificConfig.level,
      colorize: this.config.ERROR_LOG_COLORIZE,
      translateTime: this.config.ERROR_LOG_TRANSLATE_TIME,
      ignore: this.config.ERROR_LOG_IGNORE,
      messageFormat: this.config.ERROR_LOG_MESSAGE_FORMAT,
    };
  }

  private createLogger(config: IFileLoggerConfig): pino.Logger {
    const destination = path.join(config.directory, config.filename);

    return this.pinoInstance(
      {
        level: config.level,
        transport: {
          target: "pino/file",
          options: {
            destination,
            mkdir: true,
            sync: false,
          },
        },
        formatters: {
          level: (label) => ({ level: label }),
        },
        timestamp:
          config.translateTime === "true"
            ? this.pinoInstance.stdTimeFunctions.isoTime
            : undefined,
        messageKey: config.messageFormat,
      },
      this.pinoInstance.destination(destination),
    );
  }

  error(data: IErrorAdapterResult): void {
    this.errorLogger.error(data);
  }

  info(data: IErrorAdapterResult): void {
    this.accessLogger.info(data);
  }
}
