import { ErrorApp } from "@/shared/error/error";
import { HttpStatusCodeEnum, HTTP_STATUS } from "../lib/trpc/_status";
import {
  ErrorLayerType,
  IErrorLayerOptions,
  LayerErrorOptions,
} from "@/shared/error/type";
import { getCauseFromUnknown } from "@/shared/error/error.helper";

enum ErrorMessageEnum {
  UNEXPECTED_ERROR = "Unexpected error",
  UNAUTHORIZED = "Unauthorized: Need authentication",
  FORBIDDEN = "Forbidden: Permission denied",
  NOT_FOUND = "Not found",
  METHOD_NOT_SUPPORTED = "Method not supported",
  TIMEOUT = "Timeout",
  CONFLICT = "Conflict",
  PRECONDITION_FAILED = "Precondition failed",
  UNSUPPORTED_MEDIA_TYPE = "Unsupported media type",
  PAYLOAD_TOO_LARGE = "Payload too large",
  UNPROCESSABLE_CONTENT = "Unprocessable content",
  TOO_MANY_REQUESTS = "Too many requests",
  CLIENT_CLOSED_REQUEST = "Client closed request",
}

enum ErrorNameEnum {
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  METHOD_NOT_SUPPORTED = "METHOD_NOT_SUPPORTED",
  TIMEOUT = "TIMEOUT",
  CONFLICT = "CONFLICT",
  PRECONDITION_FAILED = "PRECONDITION_FAILED",
  UNSUPPORTED_MEDIA_TYPE = "UNSUPPORTED_MEDIA_TYPE",
  PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE",
  UNPROCESSABLE_CONTENT = "UNPROCESSABLE_CONTENT",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  CLIENT_CLOSED_REQUEST = "CLIENT_CLOSED_REQUEST",
}

export class UnexpectedError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      layer,
      cause,
      name: ErrorNameEnum.UNEXPECTED_ERROR,
      message: ErrorMessageEnum.UNEXPECTED_ERROR,
      details,
    });
  }
}

export class UnauthorizedError extends ErrorApp {
  constructor(params: LayerErrorOptions) {
    const { cause, layer } = params;

    super({
      name: ErrorNameEnum.UNAUTHORIZED,
      message: ErrorMessageEnum.UNAUTHORIZED,
      code: HTTP_STATUS.UNAUTHORIZED,
      layer,
      cause,
    });
  }
}

export class ForbiddenError extends ErrorApp {
  constructor(params: LayerErrorOptions) {
    const { cause, layer } = params;

    super({
      name: ErrorNameEnum.FORBIDDEN,
      code: HTTP_STATUS.FORBIDDEN,
      message: ErrorMessageEnum.FORBIDDEN,
      layer,
      cause,
    });
  }
}

export class BadRequestError extends ErrorApp {
  constructor(params: LayerErrorOptions) {
    const { cause, layer } = params;

    super({
      name: ErrorNameEnum.UNPROCESSABLE_CONTENT,
      message: ErrorMessageEnum.UNPROCESSABLE_CONTENT,
      code: HTTP_STATUS.BAD_REQUEST,
      layer,
      cause,
    });
  }
}
