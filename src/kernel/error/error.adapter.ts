import { TRPCError } from "@trpc/server";
import { injectable } from "inversify";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../lib/trpc/_status";
import { ValidateDataError } from "../lib/trpc/error";

export interface ErrorAdapterResult {
  status: string;
  code: string;
  message: string;
  text: string;
}

export interface ErrorAdapter {
  canAdapt(error: unknown): boolean;
  adapt(error: unknown): ErrorAdapterResult;
}

export class ZodErrorAdapter implements ErrorAdapter {
  canAdapt(error: unknown): boolean {
    return error instanceof ZodError;
  }

  adapt(error: ZodError): ErrorAdapterResult {
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

  adapt(error: ValidateDataError): ErrorAdapterResult {
    return {
      text: "Validation error",
      status: HTTP_STATUS.BAD_REQUEST,
      code: error.code,
      message: error.message,
    };
  }
}

export class DefaultErrorAdapter implements ErrorAdapter {
  canAdapt(error: unknown): boolean {
    return true;
  }

  adapt(error: unknown): ErrorAdapterResult {
    return {
      text: "Unknown error",
      status: HTTP_STATUS.PARSE_ERROR,
      code: "Unknown error",
      message: JSON.stringify(["UNKNOWN ERROR"]),
    };
  }
}

@injectable()
export class ErrorAdapterService {
  private readonly adapters: ErrorAdapter[];

  constructor() {
    this.adapters = [
      new ZodErrorAdapter(),
      new ValidateErrorAdapter(),
      new DefaultErrorAdapter(),
    ];
  }

  adapt(error: TRPCError): ErrorAdapterResult {
    const adapter = this.adapters.find((a) => a.canAdapt(error.cause));
    return adapter!.adapt(error.cause);
  }
}
