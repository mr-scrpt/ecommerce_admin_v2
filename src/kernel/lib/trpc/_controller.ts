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
      // TODO: add logger
      throw new TRPCError({
        code: result.value.code,
        message: JSON.stringify([result.value.message]),
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

  protected checkInput<T>(input: T | unknown, schema: ZodSchema<T>): T {
    const parseResult = schema.safeParse(input);

    if (!parseResult.success) {
      // TODO: add logger
      const issues = parseResult.error.issues;
      const message = issues.map(
        (item) => `${item.path.at(-1)}: ${item.message}`,
      );

      throw new TRPCError({
        code: HTTP_STATUS.BAD_REQUEST,
        message: JSON.stringify(message),
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
