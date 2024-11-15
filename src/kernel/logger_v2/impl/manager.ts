import { inject, injectable, multiInject } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "../domain/di";
import {
  type ILoggerAdapterManager,
  type ILoggerAdapterRegistry,
  type ILoggerStrategy,
} from "../domain/types";

@injectable()
export class LoggerAdapterManager implements ILoggerAdapterManager {
  constructor(
    @inject(LOGGER_INJECTION_TOKENS.RegistryAdapter)
    private readonly registry: ILoggerAdapterRegistry,
    @multiInject(LOGGER_INJECTION_TOKENS.LoggerStrategy)
    private readonly strategies: ILoggerStrategy[],
  ) {}

  initialize(): void {
    this.strategies.forEach((strategy) => {
      const logger = strategy.createLogger();
      this.registry.register(strategy.type, logger);
    });
  }
}
