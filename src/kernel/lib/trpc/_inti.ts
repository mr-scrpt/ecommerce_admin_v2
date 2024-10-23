import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ContextFactory } from "./_contextFactory";
import { ErrorAdapterService } from "@/kernel/error/error.service";

interface ITRPCFactory {
  errorAdapter: ErrorAdapterService;
}

export const tFactory = ({ errorAdapter }: ITRPCFactory) => {
  return initTRPC.context<ContextFactory["createContext"]>().create({
    transformer: superjson,

    errorFormatter({ shape, error }) {
      const adaptedError = errorAdapter.adapt(error);

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
  errorAdapter: new ErrorAdapterService(),
});
