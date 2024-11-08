import { HttpStatusCodeType, HttpStatusType } from "../lib/trpc/_status";

// export interface IErrorAdapter {
//   canAdapt(error: unknown): boolean;
//   adapt(error: unknown): IErrorAdapterResult;
// }

// export interface IErrorAdapterResult {
//   // status: HttpStatusType;
//   // code: HttpStatusCodeType;
//   message: Array<string>;
//   text: string;
//   details?: Array<IErrorDetail>;
// }

export interface IAccumulator {
  message: string[];
  messageDetail: string[];
  code: HttpStatusCodeType[];
  details: IErrorDetail[];
}

export interface IErrorDetail {
  // errorStatus: HttpStatusType;
  messageDetail: string;
  stackTrace: Array<IStackTraceFrame>;
}

export interface IStackTraceFrame {
  functionName: string | undefined;
  fileName: string | undefined;
  lineNumber: number | undefined;
  columnNumber: number | undefined;
}
