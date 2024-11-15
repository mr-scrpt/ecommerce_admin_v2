import { inject, injectable } from "inversify";
import type {
  ILoggerAdapter,
  ILoggerConsoleAdapter,
  ILoggerStrategy,
} from "../../domain/types";
import { LoggerAdapterType } from "../../domain/types";
import { LOGGER_INJECTION_TOKENS } from "../../domain/di";

@injectable()
export class PinoConsoleLoggerStrategy implements ILoggerStrategy {
  readonly type = LoggerAdapterType.PINO_CONSOLE;

  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerToConsole)
    private readonly adapter: ILoggerConsoleAdapter,
  ) {
    // console.log(
    //   "output_log: CONSOLE LOGGER STRATEGY CONSTRUCTOR  =>>>",
    //   adapter,
    // );
  }

  createLogger(): ILoggerAdapter {
    return this.adapter;
  }
}
