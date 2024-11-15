import {
  ERROR_APP_LAYER,
  IErrorAdapted,
  IErrorAdapterResult,
  IStackFrame,
} from "@/shared/error/type";
import { inject, injectable } from "inversify";
import { ZodError, ZodInvalidUnionIssue, ZodIssue, ZodIssueCode } from "zod";
import { IErrorAdaptBuilder } from "../../domain/builder/types";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import type { IFieldExtractor } from "../../domain/extractor/types";
import type { IErrorDetailsHandler } from "../../domain/handler/types";
import { ERROR_NAME_MAP, ZodErrorCode } from "../../domain/strategy/types";
import { IZodErrorDetails } from "../../domain/common/types";

@injectable()
export class ZodErrorAdaptBuilder implements IErrorAdaptBuilder {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ErrorDetailsHandler)
    private readonly detailsHandler: IErrorDetailsHandler,
    @inject(ERROR_INJECTION_TOKENS.StackExtractor)
    private readonly stackExtractor: IFieldExtractor<IStackFrame[]>,
  ) {}

  build(error: ZodError): IErrorAdapterResult {
    const stackFrames = this.stackExtractor.extract(error);
    const adaptedErrors = this.buildErrorList(error.errors, stackFrames);

    return {
      messageList: JSON.stringify(adaptedErrors.map((error) => error.message)),
      errorList: adaptedErrors,
    };
  }

  private buildErrorList(
    errors: ZodIssue[],
    stackFrames: IStackFrame[],
  ): IErrorAdapted[] {
    return errors.map((error) => {
      const adapted = this.buildAdaptedError(error, stackFrames);
      const cause = this.buildCauseError(error, stackFrames);

      if (cause) {
        adapted.cause = cause;
      }

      return adapted;
    });
  }

  private buildAdaptedError(
    error: ZodIssue,
    stackFrames: IStackFrame[],
  ): IErrorAdapted {
    const details = this.formatErrorDetails(error);
    const fieldPath = this.formatFieldPath(details);

    return {
      layer: ERROR_APP_LAYER.VALIDATION,
      timestamp: new Date(),
      name: this.getErrorName(error),
      message: `Field ${fieldPath}: ${error.message}`,
      details,
      stack: stackFrames,
    };
  }

  private buildCauseError(
    error: ZodIssue,
    stackFrames: IStackFrame[],
  ): IErrorAdapted | undefined {
    if (error.code === "invalid_union") {
      const unionError = error as ZodInvalidUnionIssue;
      if (unionError.unionErrors?.length > 0) {
        const firstError = unionError.unionErrors[0].errors[0];
        return this.buildAdaptedError(firstError, stackFrames);
      }
    }
    return undefined;
  }

  private formatErrorDetails(error: ZodIssue): string {
    const details = this.detailsHandler.handle(error);
    return JSON.stringify(details);
  }

  private getErrorName(error: ZodIssue): string {
    const errorCode = error.code as ZodErrorCode;
    return ERROR_NAME_MAP[errorCode] || ZodIssueCode.custom;
  }

  private formatFieldPath(details: string): string {
    const parsedDetails = JSON.parse(details) as IZodErrorDetails;
    return parsedDetails.path.length > 0
      ? parsedDetails.path.join(".")
      : "unknown";
  }
}
