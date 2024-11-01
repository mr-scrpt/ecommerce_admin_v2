import { ErrorApp } from "@/shared/error/error";
import { HTTP_STATUS } from "@/kernel/lib/trpc/_status";
import { AppErrorOptions, LayerErrorOptions } from "@/shared/error/type";

enum ErrorMessageEnum {
  CATEGORY_NOT_FOUND = "Category not found",
  CATEGORY_NOT_BEEN_CREATED = "Category not been created",
  CATEGORY_NOT_BEEN_UPDATED = "Category not been updated",
  CATEGORY_NOT_BEEN_DELETED = "Category not been deleted",
  CATEGORY_ALREADY_EXIST = "Category already exist",
  CATEGORY_NOT_UNIQUE_NAME = "Category name not unique",
  CATEGORY_NOT_BEEN_BIND_PROPERTY = "Category not been bind property",
  CATEGORY_NOT_BEEN_BIND_PRODUCT = "Category not been bind product",
  CATEGORY_INPUT_VALIDATION_ERROR = "Category input validation error",
}

export class CategoryNotFoundError extends ErrorApp {
  constructor(opts?: LayerErrorOptions) {
    super({
      code: HTTP_STATUS.NOT_FOUND,
      message: ErrorMessageEnum.CATEGORY_NOT_FOUND,
      cause: opts?.cause,
    });
  }
}

export class CategoryNotBeenCreatedError extends ErrorApp {
  constructor(opts?: LayerErrorOptions) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_CREATED,
      cause: opts?.cause,
    });
  }
}

export class CategoryNotBeenUpdatedError extends ErrorApp {
  constructor(opts?: LayerErrorOptions) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_UPDATED,
      cause: opts?.cause,
    });
  }
}

export class CategoryNotBeenDeletedError extends ErrorApp {
  constructor(opts?: LayerErrorOptions) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_DELETED,
      cause: opts?.cause,
    });
  }
}
export class CategoryAlreadyExistError extends ErrorApp {
  constructor(opts?: LayerErrorOptions) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_ALREADY_EXIST,
      cause: opts?.cause,
    });
  }
}

export class CategoryNotUniqueNameError extends ErrorApp {
  constructor(opts?: LayerErrorOptions) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_UNIQUE_NAME,
      cause: opts?.cause,
    });
  }
}

export class CategoryBindPropertyError extends ErrorApp {
  constructor(opts?: LayerErrorOptions) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_BIND_PROPERTY,
      cause: opts?.cause,
    });
  }
}

export class CategoryBindProductError extends ErrorApp {
  constructor(opts?: AppErrorOptions) {
    super({
      code: HTTP_STATUS.CONFLICT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_BIND_PRODUCT,
      cause: opts?.cause,
    });
  }
}

export class CategoryInputValidateError extends ErrorApp {
  constructor(opts?: AppErrorOptions) {
    super({
      code: HTTP_STATUS.BAD_REQUEST,
      message: ErrorMessageEnum.CATEGORY_INPUT_VALIDATION_ERROR,
      cause: opts?.cause,
    });
  }
}
