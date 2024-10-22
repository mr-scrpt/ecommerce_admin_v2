import { ErrorApp } from "@/shared/error/error";
import { HTTP_STATUS } from "./_status";

export class ValidateDataError extends ErrorApp {
  constructor({ cause, message }: { cause?: unknown; message?: string }) {
    super({
      code: HTTP_STATUS.PARSE_ERROR,
      message: message ?? "Parse errors",
      cause,
    });
  }
}
