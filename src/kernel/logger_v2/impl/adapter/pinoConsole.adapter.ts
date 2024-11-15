// import type { TLoggerConfig } from "@/shared/config/logger.config";
import { CONFIG_INJECTION_TOKENS } from "@/shared/config/di";
import type { ILoggerConfig } from "@/shared/config/logger.config";
import { IErrorAdapterResult } from "@/shared/error/type";
import { inject, injectable } from "inversify";
import pino from "pino";
import { IFileLoggerConfig, ILoggerAdapter } from "../../domain/types";

@injectable()
export class PinoConsoleLoggerAdapter implements ILoggerAdapter {
  private errorLogger: pino.Logger;
  private accessLogger: pino.Logger;

  constructor(
    @inject(CONFIG_INJECTION_TOKENS.LOGGER_CONFIG)
    private readonly config: ILoggerConfig,
  ) {
    // console.log("output_log: CONSTRUCTOR PINO CONSOLE =>>>", this.config);
    const errorFileConfig = this.createFileConfig(this.config, {
      filename: this.config.ERROR_LOG_FILENAME,
      level: this.config.ERROR_LOG_LEVEL_ERROR,
    });

    const accessFileConfig = this.createFileConfig(this.config, {
      filename: this.config.ACCESS_LOG_FILENAME,
      level: this.config.ACCESS_LOG_LEVEL_INFO,
    });

    this.errorLogger = this.createLogger(errorFileConfig);
    this.accessLogger = this.createLogger(accessFileConfig);
  }

  private createFileConfig(
    config: ILoggerConfig,
    specificConfig: { filename: string; level: string },
  ): IFileLoggerConfig {
    return {
      filename: specificConfig.filename,
      directory: config.ERROR_LOG_DESTINATION_CATALOG,
      maxSize: config.ERROR_LOG_MAX_SIZE,
      level: specificConfig.level,
      colorize: config.ERROR_LOG_COLORIZE,
      translateTime: config.ERROR_LOG_TRANSLATE_TIME,
      ignore: config.ERROR_LOG_IGNORE,
      messageFormat: config.ERROR_LOG_MESSAGE_FORMAT,
    };
  }

  private createLogger(config: IFileLoggerConfig): pino.Logger {
    return pino({
      level: config.level,
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
      formatters: {
        level: (label) => ({ level: label }),
      },
      transport: {
        target: "pino-pretty",
        options: {
          colorize: config.colorize,
          translateTime: config.translateTime,
          ignore: config.ignore,
          messageFormat: config.messageFormat,
        },
      },
    });
  }
  error(data: IErrorAdapterResult): void {
    this.errorLogger.error(data);
  }

  info(data: IErrorAdapterResult): void {
    this.accessLogger.info(data);
  }
}
