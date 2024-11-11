import { errorAdapter } from "@/kernel/error/container";
import { IErrorAdapterFacade } from "@/kernel/error/core/facade/types";
import { ILogger } from "@/shared/logger/logger.type";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { logger } from "../pino/instans";
import { ContextFactory } from "./_contextFactory";

interface ITRPCFactory {
  logger: ILogger;
  errorAdapter: IErrorAdapterFacade;
}

export const tFactory = ({ errorAdapter }: ITRPCFactory) => {
  return initTRPC.context<ContextFactory["createContext"]>().create({
    transformer: superjson,

    errorFormatter({ shape, error }) {
      const adaptedError = errorAdapter.adaptError(error.cause);
      // console.log(
      //   "output_log: ADAPTED ERROR =>>>",
      //   adaptedError.errorList.map((error) => error.stack),
      // );
      console.log("output_log: ADAPTED ERROR  =>>>", adaptedError);

      return {
        ...shape,
        data: adaptedError,
      };
    },
  });
};

export const t = tFactory({
  errorAdapter,
  logger,
});
