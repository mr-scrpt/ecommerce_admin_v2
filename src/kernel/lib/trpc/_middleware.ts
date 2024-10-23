import { ILogger } from "@/shared/logger/logger.type";
import { logger } from "../pino/instans";
import { t } from "./_inti";
import { ErrorAdapterService } from "@/kernel/error/error.service";

interface MiddlewareFactory {
  logger: ILogger;
  errorAdapter: ErrorAdapterService;
}

const withLoggerMiddleware = ({ logger, errorAdapter }: MiddlewareFactory) =>
  t.middleware(async (md) => {
    const { ctx, path, type, input, next } = md;
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;

    const user = ctx.session?.user
      ? {
          id: ctx.session.user.id,
          name: ctx.session.user.name || "",
          lastName: ctx.session.user.lastName || "",
        }
      : null;

    if (!result.ok) {
      const error = result.error;

      const adaptedError = errorAdapter.adapt(error);

      logger.error({
        status: adaptedError.status,
        code: adaptedError.code,
        message: adaptedError.message,
      });
    }

    logger.request({
      path,
      type,
      durationMs,
      user,
      input,
    });

    return result;
  });

export const loggerMiddleware = withLoggerMiddleware({
  logger,
  errorAdapter: new ErrorAdapterService(),
});
