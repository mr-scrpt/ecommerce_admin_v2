import { ErrorAdapterService } from "@/kernel/error/error.adapter";
import { ILogger } from "@/shared/logger/logger.type";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { LoggerImpl } from "../pino/logger.impl";
import { ContextFactory } from "./_contextFactory";

interface ITRPCFactory {
  logger: ILogger;
  adapter: ErrorAdapterService;
}

export const tFactory = ({ logger, adapter }: ITRPCFactory) => {
  return initTRPC.context<ContextFactory["createContext"]>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      const adaptedError = adapter.adapt(error);

      logger.error(adaptedError);

      return {
        ...shape,
        message: adaptedError.text,
        data: {
          code: adaptedError.code,
          message: adaptedError.message,
        },
      };
    },
  });
};

export const t = tFactory({
  logger: new LoggerImpl(),
  adapter: new ErrorAdapterService(),
});
