import { ErrorApp } from "@/shared/error/error";
import { HTTP_STATUS } from "@/kernel/lib/trpc/_status";

enum ErrorMessageEnum {
  PROPERTY_NOT_FOUND = "Property not found",
  PROPERTY_NOT_BEEN_CREATED = "Property not been created",
  PROPERTY_ALREADY_EXIST = "Property already exist",
  PROPERTY_NOT_EXIST = "Property not exist",
  PROPERTY_NOT_UNIQUE_NAME = "Property name already exist",
  PROPERTY_NOT_BEEN_BIND_PROPERTY = "Property not been bind property",
  PROPERTY_NOT_BEEN_BIND_PRODUCT = "Property not been bind product",
  PROPERTY_INPUT_VALIDATION_ERROR = "Property input validation error",
}

export class PropertyNotFoundError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.NOT_FOUND,
      message: ErrorMessageEnum.PROPERTY_NOT_FOUND,
      cause,
    });
  }
}

export class PropertyNotExistError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.NOT_FOUND,
      message: ErrorMessageEnum.PROPERTY_NOT_EXIST,
      cause,
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
