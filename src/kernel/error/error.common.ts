import { ErrorApp } from "@/shared/error/error";
import { HTTP_STATUS } from "../lib/trpc/_status";

export class UnexpectedError extends ErrorApp {
  constructor(params: { message: string; cause?: unknown }) {
    const { message, cause } = params;
    super({
      code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: "Unexpected error",
      cause,
    });
  }
}

export class UnauthorizedError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.UNAUTHORIZED,
      message: "Unauthorized",
      cause,
    });
  }
}
