import { ContainerModule } from "inversify";
import pino from "pino";
import { LOGGER_INJECTION_TOKENS } from "./domain/di";
import {
  ILoggerAdapterManager,
  ILoggerAdapterRegistry,
  ILoggerCombineAdapter,
  ILoggerConsoleAdapter,
  ILoggerFileAdapter,
  ILoggerNativeAdapter,
  ILoggerService,
  ILoggerStrategy,
} from "./domain/types";
import { NativeLoggerAdapter } from "./impl/adapter/native.adapter";
import { PinoCombineLoggerAdapter } from "./impl/adapter/pinoCombine.adapter";
import { PinoConsoleLoggerAdapter } from "./impl/adapter/pinoConsole.adapter";
import { PinoFileLoggerAdapter } from "./impl/adapter/pinoFile.adapter";
import { LoggerAdapterManager } from "./impl/manager";
import { LoggerAdapterRegistry } from "./impl/regestry";
import { LoggerService } from "./impl/service";
import { NativeLoggerStrategy } from "./impl/strategy/native.strategy";
import { PinoCombineLoggerStrategy } from "./impl/strategy/pinoCombine.strategy";
import { PinoConsoleLoggerStrategy } from "./impl/strategy/pinoConsole.strategy";
import { PinoFileLoggerStrategy } from "./impl/strategy/pinoFile.strategy";

export const LoggerModule = new ContainerModule((bind) => {
  console.log("Initializing LoggerModule...");

  // Явно привязываем NativeLoggerAdapter как синглтон
  bind<NativeLoggerAdapter>(LOGGER_INJECTION_TOKENS.LoggerToNative)
    .to(NativeLoggerAdapter)
    .inSingletonScope()
    .onActivation((context, adapter) => {
      console.log("NativeLoggerAdapter activated:", adapter);
      return adapter;
    });

  // Привязываем стратегию
  bind<ILoggerStrategy>(LOGGER_INJECTION_TOKENS.LoggerStrategy)
    .to(NativeLoggerStrategy)
    .inSingletonScope()
    .onActivation((context, strategy) => {
      console.log("NativeLoggerStrategy activated:", strategy);
      return strategy;
    });

  // =====================

  bind<typeof pino>(LOGGER_INJECTION_TOKENS.PinoInstance).toConstantValue(pino);

  // NOTE: ADAPTER
  // bind<ILoggerNativeAdapter>(LOGGER_INJECTION_TOKENS.LoggerToNative)
  //   .to(NativeLoggerAdapter)
  //   .inSingletonScope();

  bind<ILoggerConsoleAdapter>(LOGGER_INJECTION_TOKENS.LoggerToConsole)
    .to(PinoConsoleLoggerAdapter)
    .inSingletonScope();

  bind<ILoggerFileAdapter>(LOGGER_INJECTION_TOKENS.LoggerToFile)
    .to(PinoFileLoggerAdapter)
    .inSingletonScope();

  bind<ILoggerCombineAdapter>(LOGGER_INJECTION_TOKENS.LoggerToCombine)
    .to(PinoCombineLoggerAdapter)
    .inSingletonScope();

  // NOTE: STRATEGY
  // bind<ILoggerStrategy>(LOGGER_INJECTION_TOKENS.LoggerStrategy)
  //   .to(NativeLoggerStrategy)
  //   .inSingletonScope();

  bind<ILoggerStrategy>(LOGGER_INJECTION_TOKENS.LoggerStrategy)
    .to(PinoCombineLoggerStrategy)
    .inSingletonScope();

  bind<ILoggerStrategy>(LOGGER_INJECTION_TOKENS.LoggerStrategy)
    .to(PinoConsoleLoggerStrategy)
    .inSingletonScope();

  bind<ILoggerStrategy>(LOGGER_INJECTION_TOKENS.LoggerStrategy)
    .to(PinoFileLoggerStrategy)
    .inSingletonScope();

  // NOTE: MANAGER
  bind<ILoggerAdapterManager>(LOGGER_INJECTION_TOKENS.LoggerManager)
    .to(LoggerAdapterManager)
    .inSingletonScope();

  // NOTE: REGISTRY
  bind<ILoggerAdapterRegistry>(LOGGER_INJECTION_TOKENS.RegistryAdapter)
    .to(LoggerAdapterRegistry)
    .inSingletonScope();

  // NOTE: SERVICE
  bind<ILoggerService>(LOGGER_INJECTION_TOKENS.LoggerService)
    .to(LoggerService)
    .inSingletonScope();
});
