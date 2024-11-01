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

      logger.error({
        status: adaptedError.status,
        code: adaptedError.text,
        message: adaptedError.message,
        trace: adaptedError.trace,
      });

      return {
        ...shape,
        message: adaptedError.text,
        httpStatus: adaptedError.status,
        httpCode: adaptedError.code,
        data: {
          message: adaptedError.message,
        },
      };
    },
  });
};

export const t = tFactory({
  errorAdapter: new ErrorAdapterService(),
  logger,
});
