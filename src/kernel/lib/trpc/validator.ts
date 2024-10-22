import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { TRPCError } from "@trpc/server";
import { injectable } from "inversify";
import { ZodSchema } from "zod";
import { HTTP_STATUS } from "./_status";
import { ValidateDataError } from "./error";

@injectable()
export class Validator implements IValidator {
  checkResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
    schema: ZodSchema<T>,
  ): T {
    if (result.isLeft()) {
      const plainError = result.value.map((e) => e.message);
      throw new TRPCError({
        code: HTTP_STATUS.BAD_REQUEST,
        message: "Service errors",
        cause: new ValidateDataError({
          message: JSON.stringify(plainError),
        }),
      });
    }
    return schema.parse(result.value);
  }
}
export abstract class IValidator {
  abstract checkResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
    schema: ZodSchema<T>,
  ): T;
}
