import { IErrorAdapterFacade } from "@/kernel/error/domain/facade/types";
// import { loggerComplex, loggerNative, loggerPino, loggerPinoFile } from "@/kernel/logger_v2";
import { errorFacade } from "@/kernel/error/container";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ContextFactory } from "./_contextFactory";
import { infrastructureModule } from "@/kernel/module";
import {
  ILoggerService,
  LoggerAdapterType,
} from "@/kernel/logger_v2/domain/types";
import { LOGGER_INJECTION_TOKENS } from "@/kernel/logger_v2/domain/di";
// import { loggerComplex } from "@/kernel/logger_v2";

interface ITRPCFactory {
  // logger: ILogger;
  errorFacade: IErrorAdapterFacade;
}

const loggerService = infrastructureModule.get<ILoggerService>(
  LOGGER_INJECTION_TOKENS.LoggerService,
);

const loggerConsole = loggerService.getLogger(LoggerAdapterType.NATIVE_CONSOLE);
const loggerPinoCombine = loggerService.getLogger(
  LoggerAdapterType.PINO_COMBINE,
);

export const tFactory = ({ errorFacade }: ITRPCFactory) => {
  return initTRPC.context<ContextFactory["createContext"]>().create({
    transformer: superjson,

    errorFormatter({ shape, error }) {
      // const loggerService = new LoggerService();
      const adaptedError = errorFacade.adaptError(error.cause);
      console.log("output_log: ERROR FORMATTER =>>>");

      // loggerConsole.error(adaptedError);
      loggerPinoCombine.error(adaptedError);
      // loggerPino.error(adaptedError);

      // loggerPinoCombine.error(adaptedError);
      // loggerPinoFile.error(adaptedError);
      // loggerPinoConsole.error(adaptedError);

      // loggerPino.info({
      //   message: "PINO CONSOLE Hello INFO",
      // });
      //
      // loggerNative.error({ message: "NATIVE CONSOLE Hello ERROR" });
      // loggerNative.info({
      //   message: "NATIVE CONSOLE Hello INFO",
      // });
      //
      // loggerComplex.error(adaptedError);
      // loggerComplex.info(adaptedError);

      return {
        ...shape,
        data: adaptedError,
      };
    },
  });
};

export const t = tFactory({
  errorFacade,
  // logger: loggerError,
});
