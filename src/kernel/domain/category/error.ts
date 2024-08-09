import { ErrorApp } from "@/shared/error/error";
import { HTTP_STATUS } from "@/kernel/lib/trpc/_status";

enum ErrorMessageEnum {
  CATEGORY_NOT_FOUND = "Category not found",
  CATEGORY_NOT_BEEN_CREATED = "Category not been created",
  CATEGORY_ALREADY_EXIST = "Category already exist",
  CATEGORY_NOT_BEEN_BIND_PROPERTY = "Category not been bind property",
  CATEGORY_NOT_BEEN_BIND_PRODUCT = "Category not been bind product",
}

export class CategoryNotFoundError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.NOT_FOUND,
      message: ErrorMessageEnum.CATEGORY_NOT_FOUND,
      cause,
    });
  }
}

export class CategoryNotBeenCreatedError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_CREATED,
      cause,
    });
  }
}

export class CategoryAlreadyExistError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_ALREADY_EXIST,
      cause,
    });
  }
}

export class CategoryBindPropertyError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_BIND_PROPERTY,
      cause,
    });
  }
}

export class CategoryBindProductError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_BIND_PRODUCT,
      cause,
    });
  }
}
