import { ContainerModule } from "inversify";
import { CONFIG_INJECTION_TOKENS } from "./di";
import {
  ILoggerConfig,
  LoggerConfigBase,
  LoggerConfigImpl,
  loggerConfig,
} from "./logger.config";

console.log("output_log: INIT CONFIG MODULE =>>>");
export const ConfigModule = new ContainerModule((bind) => {
  bind<ILoggerConfig>(CONFIG_INJECTION_TOKENS.LOGGER_CONFIG).toConstantValue(
    loggerConfig,
  );
  // bind<LoggerConfigBase>(CONFIG_INJECTION_TOKENS.LOGGER_CONFIG)
  //   .to(LoggerConfigImpl)
  //   .inSingletonScope();
  //
  // // Привязываем конфигурацию как значение
  // bind<ILoggerConfig>("LoggerConfig").toConstantValue(loggerConfig);
});
