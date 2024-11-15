import { Container } from "inversify";
import { ConfigModule } from "./module";
import { CONFIG_INJECTION_TOKENS } from "./di";
import { ILoggerConfig } from "./logger.config";

const configContainer = new Container({
  defaultScope: "Singleton",
  skipBaseClassChecks: true,
});

configContainer.load(ConfigModule);

export const config = configContainer.get<ILoggerConfig>(
  CONFIG_INJECTION_TOKENS.LOGGER_CONFIG,
);

// const configService = configContainer.get<IConfigService>(
//   CONFIG_INJECTION_TOKENS.ConfigService,
// );

// const configConsole = configService.getConfig(ConfigAdapterType.NATIVE_CONSOLE);

// const configPinoConsole = configService.getConfig(
//   ConfigAdapterType.PINO_CONSOLE,
// );
// const configPinoFile = configService.getConfig(ConfigAdapterType.PINO_FILE);
//
// const configPinoCombine = configService.getConfig(
//   ConfigAdapterType.PINO_COMBINE,
// );

// export {
//   configConsole,
//   configPinoConsole,
//   // configPinoCombine,
//   // configPinoFile,
// };
