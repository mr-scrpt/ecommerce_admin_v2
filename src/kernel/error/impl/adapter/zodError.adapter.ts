import { inject, injectable } from "inversify";
import { ZodError } from "zod";
import { IErrorAdapter } from "../../domain/common/types";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import { ZodErrorAdaptBuilder } from "../builder/zodErrorAdapt.builder";
import { IErrorAdapterResult } from "@/shared/error/type";

@injectable()
export class ZodErrorAdapter implements IErrorAdapter {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ZodErrorAdaptBuilder)
    private readonly builder: ZodErrorAdaptBuilder,
  ) {}

  canAdapt(error: unknown): boolean {
    return error instanceof ZodError;
  }

  adapt(error: ZodError): IErrorAdapterResult {
    return this.builder.build(error);
  }
}
