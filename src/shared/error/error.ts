import { getCauseFromUnknown } from "./error.helper";
import {
  ErrorAppLayer,
  IErrorAppBase,
  IErrorAppCombinedOptions,
  IErrorAppOptions,
} from "./type";

export class ErrorApp extends Error implements IErrorAppBase {
  public readonly layer: ErrorAppLayer;
  public readonly details?: string;
  public readonly timestamp: Date;

  constructor(options: IErrorAppOptions) {
    super(options.message, { cause: getCauseFromUnknown(options.cause) });

    this.layer = options.layer;
    this.name = options.name;
    this.details = options.details;
    this.timestamp = new Date();

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ErrorAppCombined extends Error {
  public readonly layer: ErrorAppLayer;
  public readonly details?: string;
  public readonly timestamp: Date;
  public readonly errorList: Array<IErrorAppBase>;

  constructor(options: IErrorAppCombinedOptions) {
    super(options.message, { cause: getCauseFromUnknown(options.cause) });

    this.errorList = options.errorList;
    this.layer = options.layer;
    this.name = options.name;
    this.details = options.details;
    this.timestamp = new Date();

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

const t = {
  messageList: '["Unexpected error"]',
  errorList: [
    {
      layer: "DB",
      timestamp: "2024-11-07T12:00:30.977Z",
      name: "UNEXPECTED_ERROR",
      message: "Unexpected error",
      details:
        '{"selector":{"id":"cat_585fsddfew7898few"},"data":{"name":"Second category"}}',
      cause: {
        layer: "UNKNOWN",
        timestamp: "2024-11-07T12:00:30.985Z",
        name: "Error",
        message: "Not Implemented",
      },
    },
  ],
};

const t2 = {
  messageList: '[Category name not unique","Property not exist"]',
  errorList: [
    {
      layer: "DB",
      timestamp: "2024-11-07T12:08:47.844Z",
      name: "CATEGORY_NOT_UNIQUE_NAME",
      message: "Category name not unique",
      details:
        '{"selector":{"id":"cat_585fsddfew7898few"},"data":{"name":"Second category"}}',
    },
    {
      layer: "DB",
      timestamp: "2024-11-07T12:08:47.858Z",
      name: "PROPERTY_NOT_EXIST",
      message: "Property not exist",
      details: '{"selector":{"id":"propertyId_ewe54Tdwo58"}}',
    },
  ],
};
