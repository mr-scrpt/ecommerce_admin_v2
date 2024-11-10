import { ErrorApp } from "@/shared/error/error";
import { IErrorLayerOptions } from "@/shared/error/type";

export enum CommonErrorMessageEnum {
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

export enum CommonErrorNameEnum {
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
      name: CommonErrorNameEnum.UNEXPECTED_ERROR,
      message: CommonErrorMessageEnum.UNEXPECTED_ERROR,
      layer,
      cause,
      details,
    });
  }
}

export class UnauthorizedError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: CommonErrorNameEnum.UNAUTHORIZED,
      message: CommonErrorMessageEnum.UNAUTHORIZED,
      layer,
      cause,
      details,
    });
  }
}

export class ForbiddenError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: CommonErrorNameEnum.FORBIDDEN,
      message: CommonErrorMessageEnum.FORBIDDEN,
      layer,
      cause,
      details,
    });
  }
}

export class BadRequestError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: CommonErrorNameEnum.UNPROCESSABLE_CONTENT,
      message: CommonErrorMessageEnum.UNPROCESSABLE_CONTENT,
      layer,
      cause,
      details,
    });
  }
}
