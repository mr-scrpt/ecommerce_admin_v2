import { AnyRouter } from "@trpc/server";
import { injectable } from "inversify";
import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { TRPCError } from "@trpc/server";
import { ZodSchema } from "zod";
import { HTTP_STATUS } from "./_status";

@injectable()
export class ControllerWithValidation {
  protected checkResult<T, E extends ErrorApp>(
    result: Either<E, T>,
    schema: ZodSchema<T>,
  ): T {
    if (result.isLeft()) {
      throw new TRPCError({
        code: result.value.code,
        message: result.value.message,
      });
    }

    const parseResult = schema.safeParse(result.value);

    if (!parseResult.success) {
      throw new TRPCError({
        code: HTTP_STATUS.BAD_REQUEST,
        message: parseResult.error.message,
        cause: parseResult.error.cause,
      });
    }

    return parseResult.data;
  }
}

@injectable()
export abstract class Controller extends ControllerWithValidation {
  constructor() {
    super();
  }

  abstract router: AnyRouter;
}
