import { ErrorApp } from "@/shared/error/error";
import { IErrorLayerOptions } from "@/shared/error/type";

enum ErrorNameEnum {
  PROPERTY_UNEXPECTED_ERROR = "PROPERTY_UNEXPECTED_ERROR",
  PROPERTY_NOT_FOUND = "PROPERTY_NOT_FOUND",
  PROPERTY_NOT_BEEN_CREATED = "PROPERTY_NOT_BEEN_CREATED",
  PROPERTY_ALREADY_EXIST = "PROPERTY_ALREADY_EXIST",
  PROPERTY_NOT_EXIST = "PROPERTY_NOT_EXIST",
  PROPERTY_NOT_UNIQUE_NAME = "PROPERTY_NOT_UNIQUE_NAME",
  PROPERTY_NOT_BEEN_BIND_PROPERTY = "PROPERTY_NOT_BEEN_BIND_PROPERTY",
  PROPERTY_NOT_BEEN_BIND_PRODUCT = "PROPERTY_NOT_BEEN_BIND_PRODUCT",
  PROPERTY_INPUT_VALIDATION_ERROR = "PROPERTY_INPUT_VALIDATION_ERROR",
}
enum ErrorMessageEnum {
  PROPERTY_UNEXPECTED_ERROR = "Property Unexpected error",
  PROPERTY_NOT_FOUND = "Property not found",
  PROPERTY_NOT_BEEN_CREATED = "Property not been created",
  PROPERTY_ALREADY_EXIST = "Property already exist",
  PROPERTY_NOT_EXIST = "Property not exist",
  PROPERTY_NOT_UNIQUE_NAME = "Property name already exist",
  PROPERTY_NOT_BEEN_BIND_PROPERTY = "Property not been bind property",
  PROPERTY_NOT_BEEN_BIND_PRODUCT = "Property not been bind product",
  PROPERTY_INPUT_VALIDATION_ERROR = "Property input validation error",
}

export class PropertyUnexpectedError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.PROPERTY_UNEXPECTED_ERROR,
      message: ErrorMessageEnum.PROPERTY_UNEXPECTED_ERROR,
      layer,
      cause,
      details,
    });
  }
}
export class PropertyNotFoundError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.PROPERTY_NOT_FOUND,
      message: ErrorMessageEnum.PROPERTY_NOT_FOUND,
      layer,
      cause,
      details,
    });
  }
}

export class PropertyNotExistError extends ErrorApp {
  constructor({ layer, cause, details }: IErrorLayerOptions) {
    super({
      name: ErrorNameEnum.PROPERTY_NOT_EXIST,
      message: ErrorMessageEnum.PROPERTY_NOT_EXIST,
      layer,
      cause,
      details,
    });
  }
}
//
// export class PropertyNotBeenCreatedError extends ErrorApp {
//   constructor(cause?: unknown) {
//     super({
//       code: HTTP_STATUS.CONFLICT,
//       message: ErrorMessageEnum.PROPERTY_NOT_BEEN_CREATED,
//       cause,
//     });
//   }
// }
//
// export class PropertyAlreadyExistError extends ErrorApp {
//   constructor(cause?: unknown) {
//     super({
//       code: HTTP_STATUS.CONFLICT,
//       message: ErrorMessageEnum.PROPERTY_ALREADY_EXIST,
//       cause,
//     });
//   }
// }
//
// export class PropertyNotUniqueNameError extends ErrorApp {
//   constructor(cause?: unknown) {
//     super({
//       code: HTTP_STATUS.CONFLICT,
//       message: ErrorMessageEnum.PROPERTY_NOT_UNIQUE_NAME,
//       cause,
//     });
//   }
// }
//
// export class PropertyBindPropertyError extends ErrorApp {
//   constructor(cause?: unknown) {
//     super({
//       code: HTTP_STATUS.CONFLICT,
//       message: ErrorMessageEnum.PROPERTY_NOT_BEEN_BIND_PROPERTY,
//       cause,
//     });
//   }
// }
//
// export class PropertyBindProductError extends ErrorApp {
//   constructor(cause?: unknown) {
//     super({
//       code: HTTP_STATUS.CONFLICT,
//       message: ErrorMessageEnum.PROPERTY_NOT_BEEN_BIND_PRODUCT,
//       cause,
//     });
//   }
// }
//
// export class PropertyInputValidateError extends ErrorApp {
//   constructor(cause?: unknown) {
//     super({
//       code: HTTP_STATUS.BAD_REQUEST,
//       message: ErrorMessageEnum.PROPERTY_INPUT_VALIDATION_ERROR,
//       cause,
//     });
//   }
// }
