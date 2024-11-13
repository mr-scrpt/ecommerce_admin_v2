import { Container } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "./di";
import { LoggerModule } from "./module";
import { ILoggerFactory, LoggerType } from "./types";

const loggerContainer = new Container({
  defaultScope: "Singleton",
  skipBaseClassChecks: true,
});

loggerContainer.load(LoggerModule);

export { loggerContainer };

// const loggerFactory = loggerContainer.get<ILoggerFactory>(
//   LOGGER_INJECTION_TOKENS.LoggerFactory,
// );
//
// export { loggerFactory };
const loggerFactory = loggerContainer.get<ILoggerFactory>(
  LOGGER_INJECTION_TOKENS.LoggerFactory,
);
const loggerError = loggerFactory.createLogger(LoggerType.ERROR);
const loggerAccess = loggerFactory.createLogger(LoggerType.ACCESS);

export { loggerError, loggerAccess };
