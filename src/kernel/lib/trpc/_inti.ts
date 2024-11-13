import { errorAdapter } from "@/kernel/error/container";
import { IErrorAdapterFacade } from "@/kernel/error/domain/facade/types";
// import { loggerComplex, loggerNative, loggerPino, loggerPinoFile } from "@/kernel/logger_v2";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ContextFactory } from "./_contextFactory";
import { loggerComplex } from "@/kernel/logger_v2";

interface ITRPCFactory {
  // logger: ILogger;
  errorAdapter: IErrorAdapterFacade;
}

export const tFactory = ({ errorAdapter }: ITRPCFactory) => {
  return initTRPC.context<ContextFactory["createContext"]>().create({
    transformer: superjson,

    errorFormatter({ shape, error }) {
      // const loggerService = new LoggerService();
      const adaptedError = errorAdapter.adaptError(error.cause);

      // loggerPino.error(adaptedError);

      // loggerPino.info({
      //   message: "PINO CONSOLE Hello INFO",
      // });
      //
      // loggerNative.error({ message: "NATIVE CONSOLE Hello ERROR" });
      // loggerNative.info({
      //   message: "NATIVE CONSOLE Hello INFO",
      // });
      //
      loggerComplex.error(adaptedError);
      loggerComplex.info(adaptedError);

      return {
        ...shape,
        data: adaptedError,
      };
    },
  });
};

export const t = tFactory({
  errorAdapter,
  // logger: loggerError,
});
