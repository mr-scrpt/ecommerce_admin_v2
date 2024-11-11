export interface IErrorAdapted {
  layer: ErrorAppLayer;
  timestamp: Date;
  name: string;
  message: string;
  details?: string;
  cause?: IErrorAdapted;
  stack?: IStackFrame[];
}

export interface IErrorAdapterResult {
  messageList: string;
  errorList: Array<IErrorAdapted>;
}

export interface IStackFrame {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  functionName: string;
  source?: string;
}

export const ERROR_APP_LAYER = {
  DB: "DB",
  TRANSACTION: "TRANSACTION",
  SERVICE: "SERVICE",
  VALIDATION: "VALIDATION",
  TRANSPORT: "TRANSPORT",
  EXTERNAL: "EXTERNAL",
  MIDDLEWARE: "MIDDLEWARE",
} as const;

export type ErrorAppLayer =
  (typeof ERROR_APP_LAYER)[keyof typeof ERROR_APP_LAYER];

export interface IErrorAppBase {
  layer: ErrorAppLayer;
  timestamp: Date;
  name: string;
  message: string;
  details?: string;
  cause?: unknown;
  stack?: string;
}

export interface IErrorAppCombinedOptions extends IErrorAppOptions {
  errorList: Array<IErrorAppBase>;
}

export interface IErrorAppOptions {
  name: string;
  layer: ErrorAppLayer;
  message: string;

  details?: string;
  cause?: unknown;
}

export interface IErrorLayerOptions
  extends Pick<IErrorAppOptions, "cause" | "layer" | "details"> {}
export interface IErrorAppOptonsCombined extends IErrorAppOptions {}
