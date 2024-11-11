import { ErrorAppCombined } from "@/shared/error/error";
import { AppErrorAdapter } from "./appError.adapter";
import { inject, injectable } from "inversify";
import { IErrorAdapter } from "../../core/common/types";
import { ERROR_INJECTION_TOKENS } from "../../core/di/tokens";
import { IErrorAdapterResult } from "@/shared/error/type";

@injectable()
export class AppCombinedErrorAdapter implements IErrorAdapter {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.AppErrorAdapter)
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
