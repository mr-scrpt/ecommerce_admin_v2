import { inject, injectable } from "inversify";
import { ZodIssue } from "zod";
import { IZodErrorDetails } from "../../domain/common/types";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import { IErrorDetailsStrategy } from "../../domain/strategy/types";
import { IErrorDetailsHandler } from "../../domain/handler/types";

@injectable()
export class ZodErrorDetailsHandler implements IErrorDetailsHandler {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ErrorDetailsStrategies)
    private readonly strategies: IErrorDetailsStrategy[],
  ) {}

  handle(error: ZodIssue): IZodErrorDetails {
    const baseDetails: IZodErrorDetails = {
      code: error.code,
      path: error.path,
      message: error.message,
    };

    const strategy = this.strategies.find((s) => s.canHandle(error));

    if (strategy) {
      return { ...baseDetails, ...strategy.handle(error) };
    }

    return baseDetails;
  }
}
