import { ERROR_APP_LAYER } from "@/shared/error/type";
import { inject, injectable } from "inversify";
import { ZodError, z } from "zod";
import {
  IErrorAdapted,
  IErrorAdapter,
  IErrorAdapterResult,
  IZodErrorDetails,
} from "../../core/common/types";
import { TOKENS } from "../../core/di/tokens";
import type { IErrorDetailsHandler } from "../../core/handler/types";
import { ERROR_NAME_MAP, ZodErrorCode } from "../../core/strategy/types";

@injectable()
export class ZodErrorAdapter implements IErrorAdapter {
  constructor(
    @inject(TOKENS.ErrorDetailsHandler)
    private readonly detailsHandler: IErrorDetailsHandler,
  ) {}

  canAdapt(error: unknown): boolean {
    return error instanceof ZodError;
  }

  adapt(error: ZodError): IErrorAdapterResult {
    const adaptedErrors = this.adaptZodErrors(error.errors);
    return {
      messageList: JSON.stringify(adaptedErrors.map((error) => error.message)),
      errorList: adaptedErrors,
    };
  }

  private adaptZodErrors(errors: z.ZodIssue[]): IErrorAdapted[] {
    return errors.map((error) => {
      const details = this.formatErrorDetails(error);
      const fieldPath = this.formatFieldPath(details);
      const causeError = this.extractCause(error);

      const adapted: IErrorAdapted = {
        layer: ERROR_APP_LAYER.VALIDATION,
        timestamp: new Date(),
        name: this.getErrorName(error),
        message: `Field ${fieldPath}: ${error.message}`,
        details,
      };

      if (causeError) {
        adapted.cause = causeError;
      }

      return adapted;
    });
  }

  private formatErrorDetails(error: z.ZodIssue): string {
    const details = this.detailsHandler.handle(error);
    return JSON.stringify(details);
  }

  private getErrorName(error: z.ZodIssue): string {
    const errorCode = error.code as ZodErrorCode;
    return ERROR_NAME_MAP[errorCode] || z.ZodIssueCode.custom;
  }

  private extractCause(error: z.ZodIssue): IErrorAdapted | undefined {
    if (error.code === "invalid_union") {
      const unionError = error as z.ZodInvalidUnionIssue;
      if (unionError.unionErrors?.length > 0) {
        const firstError = unionError.unionErrors[0].errors[0];
        const details = this.formatErrorDetails(firstError);
        const fieldPath = this.formatFieldPath(details);

        return {
          layer: ERROR_APP_LAYER.VALIDATION,
          timestamp: new Date(),
          name: this.getErrorName(firstError),
          message: `Field ${fieldPath}: ${firstError.message}`,
          details,
        };
      }
    }
    return undefined;
  }

  private formatFieldPath(details: string): string {
    const parsedDetails = JSON.parse(details) as IZodErrorDetails;
    return parsedDetails.path.length > 0
      ? parsedDetails.path.join(".")
      : "unknown";
  }
}
