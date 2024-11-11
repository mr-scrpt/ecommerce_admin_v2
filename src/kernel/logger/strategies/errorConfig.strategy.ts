import { inject, injectable } from "inversify";
import {
  ILogDestination,
  ILoggerConfigStrategy,
  ILoggerOptions,
} from "../types";
import { LOGGER_INJECTION_TOKENS } from "../di";
import type { ILoggerConfig } from "@/shared/config/logger.config";

@injectable()
export class ErrorConfigStrategy implements ILoggerConfigStrategy {
  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerConfig)
    private config: ILoggerConfig,
  ) {}

  getDestination(): ILogDestination {
    return {
      catalog: this.config.ERROR_LOG_DESTINATION_CATALOG,
      filename: this.config.ERROR_LOG_FILENAME,
    };
  }

  getOptions(): ILoggerOptions {
    return {
      level: this.config.ERROR_LOG_LEVEL_ERROR,
      colorize: this.config.ERROR_LOG_COLORIZE,
      translateTime: this.config.ERROR_LOG_TRANSLATE_TIME,
      ignore: this.config.ERROR_LOG_IGNORE,
      messageFormat: this.config.ERROR_LOG_MESSAGE_FORMAT,
    };
  }
}
