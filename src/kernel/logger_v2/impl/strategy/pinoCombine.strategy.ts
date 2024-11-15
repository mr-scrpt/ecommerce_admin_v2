import { inject, injectable } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "../../domain/di";
import type {
  ILoggerAdapter,
  ILoggerCombineAdapter,
  ILoggerStrategy,
} from "../../domain/types";
import { LoggerAdapterType } from "../../domain/types";

@injectable()
export class PinoCombineLoggerStrategy implements ILoggerStrategy {
  readonly type = LoggerAdapterType.PINO_COMBINE;

  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerToCombine)
    private readonly adapter: ILoggerCombineAdapter,
  ) {
    // console.log(
    //   "output_log: COMBINE LOGGER STRATEGY CONSTRUCTOR  =>>>",
    //   adapter,
    // );
  }

  createLogger(): ILoggerAdapter {
    return this.adapter;
  }
}
