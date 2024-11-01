import { ErrorApp } from "@/shared/error/error";
import { HTTP_STATUS } from "../lib/trpc/_status";

export class UnexpectedError extends ErrorApp {
  constructor(params: { message: string; cause?: unknown }) {
    const { message, cause } = params;
    super({
      code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: message ? `Unexpected error: ${message}` : "Unexpected error",
      cause,
    });
  }
}

export class DatabaseError extends ErrorApp {
  constructor(params: { message: string; cause?: unknown }) {
    const { message, cause } = params;
    super({
      code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: message ? `Database error: ${message}` : "Database error",
      cause,
    });
  }
}

export class UnauthorizedError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.UNAUTHORIZED,
      message: "Unauthorized: Need authentication",
      cause,
    });
  }
}

export class ForbiddenError extends ErrorApp {
  constructor(message?: string, opts?: { cause?: unknown }) {
    super({
      code: HTTP_STATUS.FORBIDDEN,
      message: message
        ? `Forbidden: ${message}`
        : "Forbidden: Permission denied",
      cause: opts?.cause,
    });
  }
}

export class BadRequestError extends ErrorApp {
  constructor(params: { message: string; cause?: unknown }) {
    const { message, cause } = params;
    super({
      code: HTTP_STATUS.BAD_REQUEST,
      message: `Bad request: ${message}`,
      cause,
    });
  }
}
