import { ErrorAppCombined } from "@/shared/error/error";
import { AppErrorAdapter } from "./appError.adapter";
import { inject, injectable } from "inversify";
import { IErrorAdapter, IErrorAdapterResult } from "../../core/common/types";
import { TOKENS } from "../../core/di/tokens";

@injectable()
export class AppCombinedErrorAdapter implements IErrorAdapter {
  constructor(
    @inject(TOKENS.AppErrorAdapter)
    private readonly appErrorAdapter: AppErrorAdapter,
  ) {}

  canAdapt(error: unknown): boolean {
    return error instanceof ErrorAppCombined;
  }

  adapt(combinedError: ErrorAppCombined): IErrorAdapterResult {
    const adaptedErrors = combinedError.errorList.map((error) => {
      const adaptedSingleError = this.appErrorAdapter.adapt(error);
      const [adaptedError] = adaptedSingleError.errorList;
      return adaptedError;
    });

    const messages = adaptedErrors.map((error) => error.message);

    return {
      messageList: JSON.stringify(messages),
      errorList: adaptedErrors,
    };
  }
}
