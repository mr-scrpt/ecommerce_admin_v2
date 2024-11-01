import { ErrorApp, ErrorAppCombined } from "@/shared/error/error";
import ErrorStackParser from "error-stack-parser";
import { ZodError } from "zod";
import {
  ErrorCodeKeyType,
  HTTP_STATUS,
  HTTP_STATUS_CODE,
} from "../lib/trpc/_status";
import {
  IAccumulator,
  IErrorAdapter,
  IErrorAdapterResult,
  IErrorDetail,
  IStackTraceFrame,
} from "./type";

enum ErrorTexts {
  ParseError = "Parse error",
  ValidationError = "Validation error",
  UnknownError = "Unknown error instance",
}

// function parseStackTrace(cause: unknown): IStackTraceFrame[] | undefined {
//   if (cause && cause instanceof Error) {
//     const stackFrames = ErrorStackParser.parse(cause);
//
//     return stackFrames.map((frame) => ({
//       functionName: frame.functionName,
//       fileName: frame.fileName,
//       lineNumber: frame.lineNumber,
//       columnNumber: frame.columnNumber,
//     }));
//   }
//   return undefined;
// }
export function parseStackTrace(
  error: Error,
  maxFrames = 10,
): IStackTraceFrame[] {
  try {
    const stackFrames = ErrorStackParser.parse(error);

    return stackFrames
      .slice(0, maxFrames)
      .map((frame) => ({
        functionName: frame.functionName,
        fileName: frame.fileName,
        lineNumber: frame.lineNumber,
        columnNumber: frame.columnNumber,
      }))
      .filter(
        (frame): frame is IStackTraceFrame =>
          frame.functionName !== undefined || frame.fileName !== undefined,
      );
  } catch (parseError) {
    console.warn("Could not parse stack trace:", parseError);
    return [];
  }
}

export function formatStackTrace(stackTrace: IStackTraceFrame[]): string {
  return stackTrace
    .map(
      (frame) =>
        `at ${frame.functionName || "<anonymous>"} (${frame.fileName}:${frame.lineNumber}:${frame.columnNumber})`,
    )
    .join("\n");
}

// function accumulateErrors<T>(
//   errors: T[],
//   mapError: (err: T) => {
//     errorStatus: string;
//     message: string;
//     messageDetail: string;
//     cause?: unknown;
//   },
// ): IAccumulator {
//   return errors.reduce<IAccumulator>(
//     (acc, err) => {
//       const { errorStatus, message, messageDetail, cause } = mapError(err);
//
//       const stackTrace = parseStackTrace(cause);
//
//       acc.message.push(message);
//       acc.messageDetail.push(messageDetail);
//       acc.code.push(errorStatus as ErrorCodeKeyType);
//       acc.details.push({
//         errorStatus,
//         messageDetail,
//         stackTrace: stackTrace ?? [],
//       });
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
function accumulateErrors<T>(
  errors: T[],
  mapError: (err: T) => {
    errorStatus: string;
    message: string;
    messageDetail: string;
    cause?: unknown;
  },
): IAccumulator {
  return errors.reduce<IAccumulator>(
    (acc, err) => {
      const { errorStatus, message, messageDetail, cause } = mapError(err);

      const errorDetail: IErrorDetail = {
        errorStatus,
        messageDetail,
        stackTrace: cause instanceof Error ? parseStackTrace(cause) : [],
      };

      acc.message.push(message);
      acc.messageDetail.push(messageDetail);
      acc.code.push(errorStatus as ErrorCodeKeyType);
      acc.details.push(errorDetail);

      return acc;
    },
    {
      message: [],
      messageDetail: [],
      code: [],
      details: [],
    },
  );
}

abstract class BaseErrorAdapter implements IErrorAdapter {
  abstract canAdapt(error: unknown): boolean;
  abstract adapt(error: unknown): IErrorAdapterResult;

  protected createErrorResult(props: {
    text: string;
    status: ErrorCodeKeyType;
    code: number;
    accumulator: IAccumulator;
  }): IErrorAdapterResult {
    const { text, status, code, accumulator } = props;
    return {
      text,
      status,
      code,
      message: accumulator.message,
      details: accumulator.details.map((item) => ({
        errorStatus: item.errorStatus,
        messageDetail: item.messageDetail,
        stackTrace: item.stackTrace,
      })),
    };
  }
}

export class ZodErrorAdapter extends BaseErrorAdapter {
  canAdapt(error: unknown): boolean {
    return error instanceof ZodError;
  }

  adapt(error: ZodError): IErrorAdapterResult {
    const { errors } = error;

    const accumulator = accumulateErrors(errors, (err) => ({
      errorStatus: "INVALID_TYPE",
      messageDetail: `Field "${err.path.join(".")}": ${err.message}`,
      message: `Field "${err.path.at(-1)}": ${err.message}`,
      cause: undefined,
    }));

    const res = this.createErrorResult({
      text: ErrorTexts.ParseError,
      status: HTTP_STATUS.BAD_REQUEST,
      code: HTTP_STATUS_CODE[HTTP_STATUS.BAD_REQUEST],
      accumulator,
    });

    return res;
  }
}

export class AppErrorAdapter extends BaseErrorAdapter {
  canAdapt(error: unknown): boolean {
    return error instanceof ErrorApp;
  }

  adapt(error: ErrorApp): IErrorAdapterResult {
    const accumulator = accumulateErrors([error], (err) => ({
      errorStatus: "APPLICATION_ERROR",
      messageDetail: err.message,
      message: err.message,
      cause: err.cause,
    }));

    const res = this.createErrorResult({
      text: ErrorTexts.ParseError,
      status: HTTP_STATUS.BAD_REQUEST,
      code: HTTP_STATUS_CODE[HTTP_STATUS.BAD_REQUEST],
      accumulator,
    });

    return res;
  }
}

export class AppCombinedErrorAdapter extends BaseErrorAdapter {
  canAdapt(error: unknown): boolean {
    return error instanceof ErrorAppCombined;
  }

  adapt(error: ErrorAppCombined): IErrorAdapterResult {
    const { errors } = error;

    const accumulator = accumulateErrors(errors, (err) => ({
      errorStatus: "APPLICATION_ERROR",
      messageDetail: `${err.message}`,
      message: `${err.message}`,
      cause: err.cause,
    }));

    const res = this.createErrorResult({
      text: ErrorTexts.ParseError,
      status: HTTP_STATUS.BAD_REQUEST,
      code: HTTP_STATUS_CODE[HTTP_STATUS.BAD_REQUEST],
      accumulator,
    });
    console.log("output_log: RES =>>>", res);

    return res;
  }
}

export class DefaultErrorAdapter implements IErrorAdapter {
  canAdapt(_: unknown): boolean {
    return true;
  }

  adapt(_: unknown): IErrorAdapterResult {
    return {
      text: ErrorTexts.UnknownError,
      code: HTTP_STATUS_CODE[HTTP_STATUS.UNKNOWN_ERROR],
      status: HTTP_STATUS.UNKNOWN_ERROR,
      message: [],
      details: [],
    };
  }
}
