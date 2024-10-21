import { ErrorApp } from "@/shared/error/error";
import { ILogger } from "@/shared/logger/logger.type";
import { Either } from "@sweet-monads/either";
import { TRPCError } from "@trpc/server";
import { injectable } from "inversify";
import { ZodSchema } from "zod";
import { HTTP_STATUS } from "./_status";
import { ZodErrorAdapter } from "@/kernel/error/error.adapter";

@injectable()
export class Validator implements IValidator {
  constructor(private readonly logger: ILogger) {}
  checkResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
    schema: ZodSchema<T>,
  ): T {
    if (result.isLeft()) {
      this.logger.error(result.value);
      throw new TRPCError({
        code: HTTP_STATUS.BAD_REQUEST,
        message: JSON.stringify(result.value.map((e) => e.message)),
      });
    }

    return this.checkInput(result.value, schema);
  }

  checkInput<T>(input: unknown, schema: ZodSchema<T>): T {
    const parseResult = schema.safeParse(input);
    if (!parseResult.success) {
      const adaptedError = new ZodErrorAdapter(parseResult.error);
      this.logger.error([adaptedError]);

      throw new TRPCError({
        code: HTTP_STATUS.BAD_REQUEST,
        message: adaptedError.message,
        cause: adaptedError.cause,
      });
    }
    return parseResult.data;
  }
}

export abstract class IValidator {
  abstract checkResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
    schema: ZodSchema<T>,
  ): T;

  abstract checkInput<T>(input: T | unknown, schema: ZodSchema<T>): T;
}
