export const LOGGER_INJECTION_TOKENS = {
  Logger: Symbol.for("Logger"),
  LoggerConfig: Symbol.for("LoggerConfig"),
  LogFormatter: Symbol.for("LogFormatter"),
  LogTransport: Symbol.for("LogTransport"),
  RotationStrategy: Symbol.for("RotationStrategy"),
  LoggerFactory: Symbol.for("LoggerFactory"),
  Container: Symbol.for("Container"),

  LoggerProvider: Symbol.for("LoggerProvider"),
  LogDestination: Symbol.for("LogDestination"),
  LoggerOptions: Symbol.for("LoggerOptions"),
};
