import { ErrorApp, ErrorAppCombined } from "@/shared/error/error";
import {
  ERROR_APP_LAYER,
  ErrorAppLayer,
  IErrorAppBase,
} from "@/shared/error/type";
import { ZodError } from "zod";
// import {
//     IErrorAdapter,
//     IErrorAdapterResult
// } from "./type";

interface IErrorAdapt {
  layer: ErrorAppLayer;
  timestamp: Date;
  name: string;
  message: string;
  details?: string;
  cause?: IErrorAdapt;
}

export interface IErrorAdapterResult {
  messageList: string;
  errorList: Array<IErrorAdapt>;
}

export interface IErrorAdapter {
  canAdapt(error: unknown): boolean;
  adapt(error: unknown): IErrorAdapterResult;
}

enum ErrorMessageEnum {
  NOT_DEFINED_ERROR_INSTANCE = "Not defined error instance",
}

abstract class BaseErrorAdapter implements IErrorAdapter {
  abstract canAdapt(error: unknown): boolean;
  abstract adapt(error: unknown): IErrorAdapterResult;
}

export class AppErrorAdapter extends BaseErrorAdapter {
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

  private adaptSingleError(error: ErrorApp): IErrorAdapt {
    const adapted: IErrorAdapt = {
      layer: error.layer,
      timestamp: error.timestamp,
      name: error.name,
      message: error.message,
      details: error.details,
    };

    if (error.cause) {
      adapted.cause = this.adaptCause(error.cause);
    }

    return adapted;
  }

  private adaptCause(cause: unknown): IErrorAdapt {
    return {
      layer: this.extractErrorField(cause, "layer", ERROR_APP_LAYER.EXTERNAL),
      timestamp: this.extractTimestamp(cause),
      name: this.extractErrorField(cause, "name", "UnknownError"),
      message: this.extractMessage(cause),
      ...this.extractOptionalField(cause, "details"),
    };
  }

  private extractErrorField<T>(
    error: unknown,
    field: string,
    defaultValue: T,
  ): T {
    if (this.hasProperty(error, field)) {
      const value = error[field];
      if (value !== null && value !== undefined) {
        return value as T;
      }
    }
    return defaultValue;
  }

  private extractOptionalField(
    error: unknown,
    field: string,
  ): Record<string, unknown> {
    if (
      this.hasProperty(error, field) &&
      error[field] !== null &&
      error[field] !== undefined
    ) {
      return { [field]: String(error[field]) };
    }
    return {};
  }

  private extractMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (this.hasProperty(error, "message")) {
      return String(error.message);
    }

    return String(error);
  }

  private extractTimestamp(error: unknown): Date {
    if (this.hasProperty(error, "timestamp")) {
      const timestamp = error.timestamp;

      if (timestamp instanceof Date) {
        return timestamp;
      }

      if (typeof timestamp === "string" || typeof timestamp === "number") {
        const parsedDate = new Date(timestamp);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }

    return new Date();
  }

  private hasProperty(
    obj: unknown,
    prop: string,
  ): obj is { [key: string]: unknown } {
    return obj !== null && typeof obj === "object" && prop in obj;
  }
}

export class AppCombinedErrorAdapter extends BaseErrorAdapter {
  private readonly appErrorAdapter: AppErrorAdapter;

  constructor(appErrorAdapter: AppErrorAdapter) {
    super();
    this.appErrorAdapter = appErrorAdapter;
  }

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

export class DefaultErrorAdapter implements IErrorAdapter {
  canAdapt(_: unknown): boolean {
    return true;
  }

  adapt(_: unknown): IErrorAdapterResult {
    return {
      messageList: JSON.stringify([ErrorMessageEnum]),
      errorList: [],
    };
  }
}

// enum ErrorTexts {
//   ParseError = "Parse error",
//   ValidationError = "Validation error",
//   UnknownError = "Unknown error instance",
// }
//
// export function parseStackTrace(
//   error: Error,
//   maxFrames = 10,
// ): IStackTraceFrame[] {
//   try {
//     const stackFrames = ErrorStackParser.parse(error);
//
//     return stackFrames
//       .slice(0, maxFrames)
//       .map((frame) => ({
//         functionName: frame.functionName,
//         fileName: frame.fileName,
//         lineNumber: frame.lineNumber,
//         columnNumber: frame.columnNumber,
//       }))
//       .filter(
//         (frame): frame is IStackTraceFrame =>
//           frame.functionName !== undefined || frame.fileName !== undefined,
//       );
//   } catch (parseError) {
//     console.warn("Could not parse stack trace:", parseError);
//     return [];
//   }
// }
//
// export function formatStackTrace(stackTrace: IStackTraceFrame[]): string {
//   return stackTrace
//     .map(
//       (frame) =>
//         `at ${frame.functionName || "<anonymous>"} (${frame.fileName}:${frame.lineNumber}:${frame.columnNumber})`,
//     )
//     .join("\n");
// }
//
// function accumulateErrors<T>(
//   errors: T[],
//   mapError: (err: T) => {
//     // errorStatus: HttpStatusType;
//     message: string;
//     messageDetail: string;
//     cause?: unknown;
//   },
// ): IAccumulator {
//   return errors.reduce<IAccumulator>(
//     (acc, err) => {
//       const { message, messageDetail, cause } = mapError(err);
//
//       const errorDetail: IErrorDetail = {
//         messageDetail,
//         stackTrace: cause instanceof Error ? parseStackTrace(cause) : [],
//       };
//
//       acc.message.push(message);
//       acc.messageDetail.push(messageDetail);
//       acc.details.push(errorDetail);
//
//       return acc;
//     },
//     {
//       message: [],
//       messageDetail: [],
//       code: [],
//       details: [],
//     },
//   );
// }
//
