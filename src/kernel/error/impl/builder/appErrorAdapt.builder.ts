import {
  ErrorAppLayer,
  IErrorAdapted,
  IErrorAdapterResult,
  IStackFrame,
} from "@/shared/error/type";
import { inject, injectable } from "inversify";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import type { IFieldExtractor } from "../../domain/extractor/types";
import type { IObjectUtils } from "../../domain/utils/types";
import { CommonErrorNameEnum } from "../../errors/error.common";
import { IErrorAdaptBuilder } from "../../domain/builder/types";
import { ErrorApp } from "@/shared/error/error";

@injectable()
export class AppErrorAdaptBuilder implements IErrorAdaptBuilder {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.TimestampExtractor)
    private readonly timestampExtractor: IFieldExtractor<Date>,
    @inject(ERROR_INJECTION_TOKENS.MessageExtractor)
    private readonly messageExtractor: IFieldExtractor<string>,
    @inject(ERROR_INJECTION_TOKENS.LayerExtractor)
    private readonly layerExtractor: IFieldExtractor<ErrorAppLayer>,
    @inject(ERROR_INJECTION_TOKENS.StackExtractor)
    private readonly stackExtractor: IFieldExtractor<IStackFrame[]>,
    @inject(ERROR_INJECTION_TOKENS.ObjectUtils)
    private readonly serviceUtils: IObjectUtils,
  ) {}

  build(error: ErrorApp): IErrorAdapterResult {
    const adaptedError = this.buildAdaptedError(error);

    return {
      messageList: JSON.stringify([error.message]),
      errorList: [adaptedError],
    };
  }

  private buildAdaptedError(error: unknown): IErrorAdapted {
    const adapted: IErrorAdapted = {
      layer: this.layerExtractor.extract(error),
      timestamp: this.timestampExtractor.extract(error),
      name: this.serviceUtils.getPropertySafely(
        error,
        "name",
        CommonErrorNameEnum.UNEXPECTED_ERROR,
      ),
      message: this.messageExtractor.extract(error),
      stack: this.stackExtractor.extract(error),
      ...this.extractOptionalFields(error),
    };

    if (error instanceof ErrorApp && error.cause) {
      adapted.cause = this.buildAdaptedError(error.cause);
    }

    return adapted;
  }

  private extractOptionalFields(error: unknown): Record<string, unknown> {
    if (
      this.serviceUtils.hasProperty(error, "details") &&
      error.details !== null &&
      error.details !== undefined
    ) {
      return { details: String(error.details) };
    }
    return {};
  }
}

// @injectable()
// export class AppErrorAdaptBuilder implements IErrorAdaptBuilder {
//   constructor(
//     @inject(TOKENS.TimestampExtractor)
//     private readonly timestampExtractor: IFieldExtractor<Date>,
//     @inject(TOKENS.MessageExtractor)
//     private readonly messageExtractor: IFieldExtractor<string>,
//     @inject(TOKENS.LayerExtractor)
//     private readonly layerExtractor: IFieldExtractor<ErrorAppLayer>,
//     @inject(TOKENS.StackExtractor)
//     private readonly stackExtractor: IFieldExtractor<IStackFrame[]>,
//     @inject(TOKENS.ObjectUtils)
//     private readonly serviceUtils: IObjectUtils,
//   ) {}
//
//   buildAdaptedError(error: unknown): IErrorAdapted {
//     return {
//       layer: this.layerExtractor.extract(error),
//       timestamp: this.timestampExtractor.extract(error),
//       name: this.serviceUtils.getPropertySafely(
//         error,
//         "name",
//         CommonErrorNameEnum.UNEXPECTED_ERROR,
//       ),
//       message: this.messageExtractor.extract(error),
//       stack: this.stackExtractor.extract(error),
//       ...this.extractOptionalFields(error),
//     };
//   }
//
//   private extractOptionalFields(error: unknown): Record<string, unknown> {
//     if (
//       this.serviceUtils.hasProperty(error, "details") &&
//       error.details !== null &&
//       error.details !== undefined
//     ) {
//       return { details: String(error.details) };
//     }
//     return {};
//   }
// }
