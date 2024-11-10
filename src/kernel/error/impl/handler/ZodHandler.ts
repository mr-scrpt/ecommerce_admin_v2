import { inject, injectable } from "inversify";
import { ZodIssue } from "zod";
import { IZodErrorDetails } from "../../core/common/types";
import { TOKENS } from "../../core/di/tokens";
import { IErrorDetailsStrategy } from "../../core/strategy/types";

@injectable()
export class ZodErrorDetailsHandler {
  constructor(
    @inject(TOKENS.ErrorDetailsStrategies)
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
