import { SessionEntity } from "@/kernel/domain/session.type";
import { ILogger } from "@/shared/logger/logger.type";
import { TRPCError } from "@trpc/server";
import { ZodTypeAny, z } from "zod";
import { LoggerImpl } from "../pino/logger.impl";
import { t } from "./_inti";
import { ErrorAdapterService } from "@/kernel/error/error.adapter";

interface MiddlewareFactory {
  logger: ILogger;
  adapter: ErrorAdapterService;
}

const withLoggerMiddleware = ({ logger, adapter }: MiddlewareFactory) =>
  t.middleware(async (md) => {
    const { ctx, next, path, type, input } = md;
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;

    const user = ctx.session?.user
      ? {
          id: ctx.session.user.id ?? "",
          name: ctx.session.user.name ?? "",
          lastName: ctx.session.user.lastName ?? "",
        }
      : null;

    if (!result.ok) {
      const adaptedError = adapter.adapt(result.error);

      logger.error(adaptedError);
    }

    logger.request({
      path,
      type,
      durationMs,
      input,
      user,
    });

    return result;
  });

const loggerMiddleware = withLoggerMiddleware({
  logger: new LoggerImpl(),
  adapter: new ErrorAdapterService(),
});

const baseProcedure = t.procedure.use(loggerMiddleware);
export const publicProcedure = baseProcedure;

export const authorizedProcedure = baseProcedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const checkAbilityProcedure = <Ability>({
  check,
  create,
}: {
  check?: (ability: Ability) => boolean;
  create: (session: SessionEntity) => Ability;
}) =>
  authorizedProcedure.use(({ ctx, next }) => {
    const ability = create(ctx.session);

    if (check && !check(ability)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        session: ctx.session,
        ability,
      },
    });
  });

export const checkAbilityInputProcedure = <Ability, Input extends ZodTypeAny>({
  check,
  create,
  input,
}: {
  input: Input;
  check: (ability: Ability, input: z.infer<Input>) => boolean;
  create: (session: SessionEntity) => Ability;
}) =>
  authorizedProcedure.input(input).use(({ ctx, next, input: params }) => {
    const ability = create(ctx.session);

    if (!check(ability, params)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        session: ctx.session,
        ability,
      },
    });
  });
