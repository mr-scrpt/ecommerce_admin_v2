import { CONFIG_INJECTION_TOKENS } from "@/shared/config/di";
// import type { TLoggerConfig } from "@/shared/config/logger.config";
import type { ILoggerConfig } from "@/shared/config/logger.config";
import { IErrorAdapted, IErrorAdapterResult } from "@/shared/error/type";
import { inject, injectable } from "inversify";
import pino from "pino";
import { LOGGER_INJECTION_TOKENS } from "../../domain/di";
import type { ILoggerAdapter, ILoggerFileAdapter } from "../../domain/types";

@injectable()
export class PinoCombineLoggerAdapter implements ILoggerAdapter {
  private consoleLogger: pino.Logger;

  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerToFile)
    private readonly fileLogger: ILoggerFileAdapter,

    @inject(CONFIG_INJECTION_TOKENS.LOGGER_CONFIG)
    private readonly config: ILoggerConfig,
    @inject(LOGGER_INJECTION_TOKENS.PinoInstance)
    private readonly pinoInstance: typeof pino,
  ) {
    this.consoleLogger = this.createConsoleLogger();
  }

  private createConsoleLogger(): pino.Logger {
    return this.pinoInstance({
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: this.config.ERROR_LOG_COLORIZE,
          translateTime: this.config.ERROR_LOG_TRANSLATE_TIME,
          ignore: "pid,hostname,stack,messageList",
          messageFormat: this.config.ERROR_LOG_MESSAGE_FORMAT,
        },
      },
    });
  }

  private formatErrorForConsole(error: IErrorAdapted): Partial<IErrorAdapted> {
    const { stack, ...errorWithoutStack } = error;
    return {
      ...errorWithoutStack,
      timestamp: new Date(error.timestamp),
    };
  }

  private formatErrorResultForConsole(
    data: IErrorAdapterResult,
  ): Record<string, unknown> {
    return {
      errors: data.errorList.map((error) => this.formatErrorForConsole(error)),
    };
  }

  error(data: IErrorAdapterResult): void {
    this.fileLogger.error(data);
    const consoleData = this.formatErrorResultForConsole(data);
    this.consoleLogger.error(consoleData);
  }

  info(data: IErrorAdapterResult): void {
    this.fileLogger.info(data);
    const consoleData = this.formatErrorResultForConsole(data);
    this.consoleLogger.info(consoleData);
  }
}
