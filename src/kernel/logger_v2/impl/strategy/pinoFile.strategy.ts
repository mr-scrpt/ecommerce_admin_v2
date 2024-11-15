import { inject, injectable } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "../../domain/di";
import type {
  ILoggerAdapter,
  ILoggerFileAdapter,
  ILoggerStrategy,
} from "../../domain/types";
import { LoggerAdapterType } from "../../domain/types";

@injectable()
export class PinoFileLoggerStrategy implements ILoggerStrategy {
  readonly type = LoggerAdapterType.PINO_FILE;

  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerToFile)
    private readonly adapter: ILoggerFileAdapter,
  ) {
    // console.log("output_log: FILE LOGGER STRATEGY CONSTRUCTOR  =>>>", adapter);
  }

  createLogger(): ILoggerAdapter {
    return this.adapter;
  }
}
