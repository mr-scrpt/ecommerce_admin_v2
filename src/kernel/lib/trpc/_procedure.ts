import { SessionEntity } from "@/kernel/domain/session.type";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { AnyRouter, TRPCError } from "@trpc/server";
import { ZodTypeAny, z } from "zod";
import { t } from "./_inti";

export const publicProcedure = t.procedure;

export const authorizedProcedure = t.procedure.use(({ ctx, next }) => {
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

export const createPublicServerApi = <T extends AnyRouter>(router: T) =>
  createServerSideHelpers<T>({
    router: router,
    ctx: () => ({}),
  } as any);
