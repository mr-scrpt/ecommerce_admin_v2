import { ZodError } from "zod";
import { ErrorCodeKeyType, HTTP_STATUS } from "../lib/trpc/_status";
import { ValidateDataError } from "../lib/zod/error";
import { IErrorAdapterResult } from "./type";

export interface ErrorAdapter {
  canAdapt(error: unknown): boolean;
  adapt(error: unknown): IErrorAdapterResult;
}

type ErrorTrace = {
  code: string;
  messageDetail: string;
  cause: unknown;
};

interface Accumulator {
  message: string[];
  messageDetail: string[];
  code: ErrorCodeKeyType[];
  trace: ErrorTrace[];
}

enum ErrorTexts {
  ParseError = "Parse error",
  ValidationError = "Validation error",
  UnknownError = "Unknown error instance",
}

function accumulateErrors<T>(
  errors: T[],
  mapError: (err: T) => {
    code: string;
    message: string;
    messageDetail: string;
    cause?: unknown;
  },
): Accumulator {
  return errors.reduce<Accumulator>(
    (acc, err) => {
      const { code, message, messageDetail, cause } = mapError(err);
      acc.message.push(`${code}: ${message}`);
      acc.messageDetail.push(messageDetail);
      acc.code.push(code as ErrorCodeKeyType);
      acc.trace.push({
        code,
        messageDetail,
        cause: cause || undefined,
      });
      return acc;
    },
    {
      message: [],
      messageDetail: [],
      code: [],
      trace: [],
    },
  );
}

abstract class BaseErrorAdapter implements ErrorAdapter {
  abstract canAdapt(error: unknown): boolean;
  abstract adapt(error: unknown): IErrorAdapterResult;

  protected createErrorResult(
    text: string,
    status: string,
    accumulator: Accumulator,
  ): IErrorAdapterResult {
    return {
      text,
      status,
      message: accumulator.message,
      trace: accumulator.trace,
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
      code: HTTP_STATUS.INVALID_TYPE,
      messageDetail: `Field "${err.path.join(".")}": ${err.message}`,
      message: `Field "${err.path.at(-1)}": ${err.message}`,
      cause: undefined,
    }));

    const res = this.createErrorResult(
      ErrorTexts.ParseError,
      HTTP_STATUS.PARSE_ERROR,
      accumulator,
    );

    return res;
  }
}

export class ValidateErrorAdapter extends BaseErrorAdapter {
  canAdapt(error: unknown): boolean {
    return error instanceof ValidateDataError;
  }

  adapt(error: ValidateDataError): IErrorAdapterResult {
    const { errors } = error;

    const accumulator = accumulateErrors(errors, (err) => ({
      code: HTTP_STATUS.INVALID_TYPE,
      messageDetail: `${err.message}`,
      message: `${err.message}`,
      cause: err.cause,
    }));

    const res = this.createErrorResult(
      ErrorTexts.ParseError,
      HTTP_STATUS.PARSE_ERROR,
      accumulator,
    );

    console.log("output_log: ERROR BUILD APPERROR =>>>", res);

    return res;
  }
}

export class DefaultErrorAdapter implements ErrorAdapter {
  canAdapt(_: unknown): boolean {
    return true;
  }

  adapt(_: unknown): IErrorAdapterResult {
    return {
      text: ErrorTexts.UnknownError,
      status: HTTP_STATUS.UNKNOWN_ERROR,
      message: [],
      trace: [],
    };
  }
}
