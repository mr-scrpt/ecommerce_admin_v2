import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import { ZodSchema } from "zod";
import { ValidateDataError } from "./error";

@injectable()
export class Validator implements IValidator {
  checkResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
    schema: ZodSchema<T>,
  ): T {
    if (result.isLeft()) {
      const errorArray = result.value.map((e) => e);

      throw new ValidateDataError({
        errors: errorArray,
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
