import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ContextFactory } from "./_contextFactory";
import { ErrorAdapterService } from "@/kernel/error/error.service";
import { ILogger } from "@/shared/logger/logger.type";
import { logger } from "../pino/instans";

interface ITRPCFactory {
  errorAdapter: ErrorAdapterService;
  logger: ILogger;
}

export const tFactory = ({ errorAdapter }: ITRPCFactory) => {
  return initTRPC.context<ContextFactory["createContext"]>().create({
    transformer: superjson,

    errorFormatter({ shape, error }) {
      const adaptedError = errorAdapter.adapt(error);
      console.log(
        "output_log: ********___ADAPTED ERROR___********* =>>>",
        JSON.stringify(adaptedError, null, 2),
      );
      return shape;
    },
  });
};

export const t = tFactory({
  errorAdapter: new ErrorAdapterService(),
  logger,
});
