export const TOKENS = {
  ErrorContainer: Symbol("ErrorContainer"),
  // NOTE: Extractors
  TimestampExtractor: Symbol("TimestampExtractor"),
  MessageExtractor: Symbol("MessageExtractor"),
  LayerExtractor: Symbol("LayerExtractor"),

  // NOTE: Builders
  ErrorBuilder: Symbol("ErrorBuilder"),

  // NOTE: Handlers
  ErrorDetailsHandler: Symbol("ErrorDetailsHandler"),

  // NOTE: Strategies
  ErrorDetailsStrategies: Symbol("ErrorDetailsStrategies"),

  // NOTE: Adapters
  AppErrorAdapter: Symbol("AppErrorAdapter"),
  AppCombinedErrorAdapter: Symbol("AppCombinedErrorAdapter"),
  ZodErrorAdapter: Symbol("ZodErrorAdapter"),

  // NOTE: Registry
  ErrorAdapterRegistry: Symbol("ErrorAdapterRegistry"),

  // NOTE: Facade
  ErrorAdapterFacade: Symbol("ErrorAdapterFacade"),

  // NOTE: Utils
  ObjectUtils: Symbol("ObjectUtils"),

  // NOTE: Strategies
  InvalidTypeStrategy: Symbol("InvalidTypeStrategy"),
  InvalidEnumStrategy: Symbol("InvalidEnumStrategy"),
  SizeConstraintStrategy: Symbol("SizeConstraintStrategy"),
} as const;
