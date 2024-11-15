import { inject, injectable } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "../domain/di";
import type {
  ILogger,
  ILoggerAdapterManager,
  ILoggerAdapterRegistry,
  ILoggerService,
  LoggerAdapterType,
} from "../domain/types";

@injectable()
export class LoggerService implements ILoggerService {
  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerManager)
    private readonly manager: ILoggerAdapterManager,
    @inject(LOGGER_INJECTION_TOKENS.RegistryAdapter)
    private readonly registry: ILoggerAdapterRegistry,
  ) {
    this.manager.initialize();
  }

  getLogger(type: LoggerAdapterType): ILogger {
    return this.registry.getLogger(type);
  }
}
