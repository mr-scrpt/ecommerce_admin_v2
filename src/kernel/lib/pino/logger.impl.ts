import { inject, injectable } from "inversify";
import { Logger } from "pino";
import { ILogger } from "../../../shared/logger/logger.type";
import {
  type ILoggerConfigFactory,
  LOGGER_TYPES,
  LoggerType,
  ILoggerErrorParams,
  ILoggerRequestParams,
} from "./type";

@injectable()
export class LoggerImpl implements ILogger {
  private readonly errorLogger: Logger;
  private readonly accessLogger: Logger;

  constructor(
    @inject(LOGGER_TYPES.LoggerConfigFactory)
    private loggerConfigFactore: ILoggerConfigFactory,
  ) {
    this.errorLogger = this.loggerConfigFactore.getLogger(LoggerType.ERROR);
    this.accessLogger = this.loggerConfigFactore.getLogger(LoggerType.ACCESS);
  }

  error(error: ILoggerErrorParams): void {
    this.errorLogger.error({ msg: error.message, args: error });
  }

  request(info: ILoggerRequestParams): void {
    const { user } = info;
    const msg = `[${info.durationMs}ms] ${
      user
        ? `USER_ID: ${user.id}, USER_NAME: ${user.name}, USER_LAST_NAME: ${user.lastName}`
        : "Anonymous User"
    } Request type [${info.type.toUpperCase()}] to [${info.path}]`;

    this.accessLogger.info({
      msg,
      args: info,
    });
  }
}
