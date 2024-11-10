import { ErrorApp } from "@/shared/error/error";
import type {
  IErrorAdapter,
  IErrorAdapterResult,
  IErrorAdapted,
} from "../../core/common/types";
import { TOKENS } from "../../core/di/tokens";
import { inject, injectable } from "inversify";
import { ErrorAdaptBuilder } from "../builder/errorAdapt.builder";

@injectable()
export class AppErrorAdapter implements IErrorAdapter {
  constructor(
    @inject(TOKENS.ErrorBuilder)
    private readonly errorBuilder: ErrorAdaptBuilder,
  ) {}

  canAdapt(error: unknown): boolean {
    return error instanceof ErrorApp;
  }

  adapt(errorApp: ErrorApp): IErrorAdapterResult {
    const adaptedError = this.adaptSingleError(errorApp);

    return {
      messageList: JSON.stringify([errorApp.message]),
      errorList: [adaptedError],
    };
  }

  private adaptSingleError(error: ErrorApp): IErrorAdapted {
    console.log("output_log: STACK =>>>", error.stack);
    const adapted: IErrorAdapted = this.errorBuilder.buildAdaptedError(error);

    if (error.cause) {
      adapted.cause = this.errorBuilder.buildAdaptedError(error.cause);
    }

    return adapted;
  }
}
