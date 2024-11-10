import { SessionEntity } from "@/kernel/domain/session.type";
import { ILogger } from "@/shared/logger/logger.type";
import { Session } from "next-auth";
import { ZodTypeAny, z } from "zod";
import { logger } from "../pino/instans";
import { t } from "./_inti";
import { UnauthorizedError } from "@/kernel/error/errors/error.common";
import { ERROR_APP_LAYER } from "@/shared/error/type";

interface MiddlewareFactory {
  logger: ILogger;
}

export interface CheckAbility<A> {
  check?: (ability: A) => void;
  create: (session: SessionEntity) => A;
}

const withLoggingRequestMiddleware = ({ logger }: MiddlewareFactory) =>
  t.middleware(async (md) => {
    const { ctx, path, type, input, next } = md;
    const start = Date.now();
    const durationMs = Date.now() - start;

    const user = ctx.session?.user
      ? {
          id: ctx.session.user.id,
          name: ctx.session.user.name || "",
          lastName: ctx.session.user.lastName || "",
        }
      : null;

    logger.request({
      path,
      type,
      durationMs,
      user,
      input,
    });

    return next(md);
  });

export const loggingRequestMiddleware = withLoggingRequestMiddleware({
  logger,
});

const checkSessionMiddleware = (session: Session | null) => {
  if (!session) {
    throw new UnauthorizedError({ layer: ERROR_APP_LAYER.MIDDLEWARE });
  }
};
export const authMiddleware = t.middleware(({ ctx, next }) => {
  checkSessionMiddleware(ctx.session);
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const checkAbilityMiddleware = <Ability>({
  check,
  create,
}: CheckAbility<Ability>) =>
  t.middleware(({ ctx, next }) => {
    const ability = create(ctx.session!);

    if (check) {
      check(ability);
    }

    return next({
      ctx: {
        session: ctx.session,
        ability,
      },
    });
  });

export const checkAbilityInputMiddleware = <Ability, Input extends ZodTypeAny>({
  check,
  create,
}: {
  check: (ability: Ability, input: z.infer<Input>) => boolean;
  create: (session: SessionEntity) => Ability;
}) =>
  t.middleware(({ ctx, next, input: params }) => {
    const ability = create(ctx.session!);

    if (!check(ability, params)) {
      throw new ForbiddenError();
    }

    return next({
      ctx: {
        session: ctx.session,
        ability,
      },
    });
  });
