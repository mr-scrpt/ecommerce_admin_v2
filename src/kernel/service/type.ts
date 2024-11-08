import { ErrorApp } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { ZodSchema } from "zod";

export abstract class ICheckService {
  abstract checkResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
    schema: ZodSchema<T>,
  ): T;
}

export abstract class IUtilsService {
  abstract buildMonadErrorArray<T>(
    input: Either<ErrorApp, T>,
  ): Either<Array<ErrorApp>, T>;
}
