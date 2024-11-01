import { SessionEntity } from "@/kernel/domain/session.type";
import { TRPCError } from "@trpc/server";
import { ZodTypeAny, z } from "zod";
import { t } from "./_inti";
import {
  CheckAbility,
  authMiddleware,
  checkAbilityInputMiddleware,
  checkAbilityMiddleware,
  loggingRequestMiddleware,
} from "./_middleware";

const baseProcedure = t.procedure.use(loggingRequestMiddleware);

export const publicProcedure = baseProcedure;

export const authenticationProcedure = baseProcedure.use(authMiddleware);

export const checkAbilityProcedure = <Ability>({
  check,
  create,
}: CheckAbility<Ability>) =>
  authenticationProcedure.use(
    checkAbilityMiddleware({
      check,
      create,
    }),
  );

export const checkAbilityInputProcedure = <Ability, Input extends ZodTypeAny>({
  check,
  create,
  input,
}: {
  input: Input;
  check: (ability: Ability, input: z.infer<Input>) => boolean;
  create: (session: SessionEntity) => Ability;
}) =>
  authenticationProcedure.input(input).use(
    checkAbilityInputMiddleware({
      check,
      create,
    }),
  );

// export const checkAbilityInputProcedureAlt = <
//   Ability,
//   Input extends ZodTypeAny,
// >({
//   check,
//   create,
//   input,
// }: {
//   input: Input;
//   check: (ability: Ability, input: z.infer<Input>) => boolean;
//   create: (session: SessionEntity) => Ability;
// }) =>
//   authenticationProcedure.input(input).use(({ ctx, next, input: params }) => {
//     const ability = create(ctx.session);
//
//     if (!check(ability, params)) {
//       throw new TRPCError({ code: "FORBIDDEN" });
//     }
//
//     return next({
//       ctx: {
//         session: ctx.session,
//         ability,
//       },
//     });
//   });
