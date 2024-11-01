import { ErrorCodeKeyType } from "../lib/trpc/_status";

export interface IErrorAdapter {
  canAdapt(error: unknown): boolean;
  adapt(error: unknown): IErrorAdapterResult;
}

export interface IAccumulator {
  message: string[];
  messageDetail: string[];
  code: ErrorCodeKeyType[];
  details: IErrorDetail[];
}
export interface IErrorAdapterResult {
  status: ErrorCodeKeyType;
  code: number;
  message: Array<string>;
  text: string;
  details?: Array<IErrorDetail>;
}
export interface IErrorDetail {
  errorStatus: string;
  messageDetail: string;
  stackTrace: Array<IStackTraceFrame>;
}

export interface IStackTraceFrame {
  functionName: string | undefined;
  fileName: string | undefined;
  lineNumber: number | undefined;
  columnNumber: number | undefined;
}
