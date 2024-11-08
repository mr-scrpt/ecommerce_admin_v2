import { ErrorApp } from "@/shared/error/error";
import { IErrorLayerOptions } from "@/shared/error/type";

enum ErrorNameEnum {
  CATEGORY_UNEXPECTED_ERROR = "CATEGORY_UNEXPECTED_ERROR",
  CATEGORY_NOT_FOUND = "CATEGORY_NOT_FOUND",
  CATEGORY_NOT_BEEN_CREATED = "CATEGORY_NOT_BEEN_CREATED",
  CATEGORY_NOT_BEEN_UPDATED = "CATEGORY_NOT_BEEN_UPDATED",
  CATEGORY_NOT_BEEN_DELETED = "CATEGORY_NOT_BEEN_DELETED",
  CATEGORY_ALREADY_EXIST = "CATEGORY_ALREADY_EXIST",
  CATEGORY_NOT_EXIST = "CATEGORY_NOT_EXIST",
  CATEGORY_NOT_UNIQUE_NAME = "CATEGORY_NOT_UNIQUE_NAME",
  CATEGORY_NOT_BEEN_BIND_PROPERTY = "CATEGORY_NOT_BEEN_BIND_PROPERTY",
  CATEGORY_NOT_BEEN_BIND_PRODUCT = "CATEGORY_NOT_BEEN_BIND_PRODUCT",
  CATEGORY_INPUT_VALIDATION_ERROR = "CATEGORY_INPUT_VALIDATION_ERROR",
}

enum ErrorMessageEnum {
  CATEGORY_UNEXPECTED_ERROR = "Category Unexpected error",
  CATEGORY_NOT_FOUND = "Category not found",
  CATEGORY_NOT_BEEN_CREATED = "Category not been created",
  CATEGORY_NOT_BEEN_UPDATED = "Category not been updated",
  CATEGORY_NOT_BEEN_DELETED = "Category not been deleted",
  CATEGORY_ALREADY_EXIST = "Category already exist",
  CATEGORY_NOT_EXIST = "Category not exist",
  CATEGORY_NOT_UNIQUE_NAME = "Category name not unique",
  CATEGORY_NOT_BEEN_BIND_PROPERTY = "Category not been bind property",
  CATEGORY_NOT_BEEN_BIND_PRODUCT = "Category not been bind product",
  CATEGORY_INPUT_VALIDATION_ERROR = "Category input validation error",
}

export class CategoryUnexpectedError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_UNEXPECTED_ERROR,
      message: ErrorMessageEnum.CATEGORY_UNEXPECTED_ERROR,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryNotFoundError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_FOUND,
      message: ErrorMessageEnum.CATEGORY_NOT_FOUND,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryNotBeenCreatedError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_BEEN_CREATED,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_CREATED,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryNotBeenUpdatedError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_BEEN_UPDATED,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_UPDATED,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryNotBeenDeletedError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_BEEN_DELETED,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_DELETED,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryNotExistError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_EXIST,
      message: ErrorMessageEnum.CATEGORY_NOT_EXIST,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryAlreadyExistError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_ALREADY_EXIST,
      message: ErrorMessageEnum.CATEGORY_ALREADY_EXIST,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryNotUniqueNameError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_UNIQUE_NAME,
      message: ErrorMessageEnum.CATEGORY_NOT_UNIQUE_NAME,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryBindPropertyError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_BEEN_BIND_PROPERTY,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_BIND_PROPERTY,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryBindProductError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_NOT_BEEN_BIND_PRODUCT,
      message: ErrorMessageEnum.CATEGORY_NOT_BEEN_BIND_PRODUCT,
      layer,
      cause,
      details,
    });
  }
}

export class CategoryInputValidateError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.CATEGORY_INPUT_VALIDATION_ERROR,
      message: ErrorMessageEnum.CATEGORY_INPUT_VALIDATION_ERROR,
      layer,
      cause,
      details,
    });
  }
}
