// import { Container } from "inversify";
// import { LOGGER_INJECTION_TOKENS } from "./domain/di";
// import { ILoggerService, LoggerAdapterType } from "./domain/types";
// import { LoggerModule } from "./module";
//
// const loggerContainer = new Container({
//   defaultScope: "Singleton",
//   skipBaseClassChecks: true,
// });
//
// loggerContainer.load(LoggerModule);
//
// const loggerService = loggerContainer.get<ILoggerService>(
//   LOGGER_INJECTION_TOKENS.LoggerService,
// );
//
// const loggerConsole = loggerService.getLogger(LoggerAdapterType.NATIVE_CONSOLE);
//
// loggerConsole.error({
//   messageList: "test ERROR ====>>>>>>>>>",
//   errorList: [],
// });
//
// const loggerPinoConsole = loggerService.getLogger(
//   LoggerAdapterType.PINO_CONSOLE,
// );
// // const loggerPinoFile = loggerService.getLogger(LoggerAdapterType.PINO_FILE);
// //
// // const loggerPinoCombine = loggerService.getLogger(
// //   LoggerAdapterType.PINO_COMBINE,
// // );
//
// export {
//   loggerConsole,
//   loggerPinoConsole,
//   // loggerPinoCombine,
//   // loggerPinoFile,
// };
