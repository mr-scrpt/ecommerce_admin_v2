import { ErrorApp } from "@/shared/error/error";
import { inject, injectable } from "inversify";
import type { IErrorAdapter } from "../../domain/common/types";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import { AppErrorAdaptBuilder } from "../builder/appErrorAdapt.builder";
import { IErrorAdapterResult } from "@/shared/error/type";

@injectable()
export class AppErrorAdapter implements IErrorAdapter {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.AppErrorAdaptBuilder)
    private readonly builder: AppErrorAdaptBuilder,
  ) {}

  canAdapt(error: unknown): boolean {
    return error instanceof ErrorApp;
  }

  adapt(error: ErrorApp): IErrorAdapterResult {
    return this.builder.build(error);
  }
}
