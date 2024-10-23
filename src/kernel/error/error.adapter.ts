import { ZodError } from "zod";
import { HTTP_STATUS } from "../lib/trpc/_status";
import { ValidateDataError } from "../lib/trpc/error";
import { IErrorAdapterResult } from "./type";

export interface ErrorAdapter {
  canAdapt(error: unknown): boolean;
  adapt(error: unknown): IErrorAdapterResult;
}

export class ZodErrorAdapter implements ErrorAdapter {
  canAdapt(error: unknown): boolean {
    return error instanceof ZodError;
  }

  adapt(error: ZodError): IErrorAdapterResult {
    return {
      text: "Parse error",
      status: HTTP_STATUS.PARSE_ERROR,
      code: "PARSE_ERROR",
      message: JSON.stringify(
        error.errors.map(
          (err) => `Field "${err.path.join(".")}": ${err.message}`,
        ),
      ),
    };
  }
}

export class ValidateErrorAdapter implements ErrorAdapter {
  canAdapt(error: unknown): boolean {
    return error instanceof ValidateDataError;
  }

  adapt(error: ValidateDataError): IErrorAdapterResult {
    return {
      text: "Validation error",
      status: HTTP_STATUS.BAD_REQUEST,
      code: error.code,
      message: error.message,
    };
  }
}

export class DefaultErrorAdapter implements ErrorAdapter {
  canAdapt(_: unknown): boolean {
    return true;
  }

  adapt(_: unknown): IErrorAdapterResult {
    return {
      text: "Unknown error",
      status: HTTP_STATUS.PARSE_ERROR,
      code: "Unknown error",
      message: JSON.stringify(["UNKNOWN ERROR"]),
    };
  }
}
