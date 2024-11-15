export const LOGGER_INJECTION_TOKENS = {
  Logger: Symbol.for("LOGGER"),
  LoggerAdapters: Symbol.for("LOGGER_ADAPTERS"),
  LoggerManager: Symbol.for("LOGGER_MANAGER"),
  LoggerFactory: Symbol.for("LOGGER_FACTORY"),
  LoggerStrategy: Symbol.for("LOGGER_STRATEGY"),
  LoggerService: Symbol.for("LOGGER_SERVICE"),

  LoggerToFile: Symbol.for("LOGGER_TO_FILE"),
  LoggerToCombine: Symbol.for("LOGGER_TO_COMBINE"),
  LoggerToConsole: Symbol.for("LOGGER_TO_CONSOLE"),
  LoggerToNative: Symbol.for("LOGGER_TO_NATIVE"),

  PinoInstance: Symbol.for("PINO_INSTANCE"),

  RegistryAdapter: Symbol.for("REGISTRY_ADAPTER"),
} as const;
