import { ErrorApp, ErrorAppCombined } from "@/shared/error/error";
import { Either } from "@sweet-monads/either";
import { injectable } from "inversify";
import { ZodSchema } from "zod";
import { ICheckService } from "./type";

@injectable()
export class CheckService implements ICheckService {
  private checkAppResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
  ): T {
    if (result.isLeft()) {
      const errorArray = result.value.map((e) => e);

      throw new ErrorAppCombined({
        errors: errorArray,
      });
    }
    return result.value;
  }

  private checkSheema<T>(result: T, schema: ZodSchema<T>): T {
    return schema.parse(result);
  }

  checkResult<T, E extends ErrorApp>(
    result: Either<Array<E>, T>,
    schema: ZodSchema<T>,
  ): T {
    const appResult = this.checkAppResult(result);

    return this.checkSheema(appResult, schema);
  }
}
