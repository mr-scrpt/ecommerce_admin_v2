import { IErrorAdapterResult } from "@/shared/error/type";

export interface IZodErrorDetails {
  code: string;
  path: (string | number)[];
  message: string;
  received?: unknown;
  expected?: unknown;
  type?: "array" | "string" | "number" | "bigint" | "set" | "date";
}

export interface IErrorAdapter {
  canAdapt(error: unknown): boolean;
  adapt(error: unknown): IErrorAdapterResult;
}

export enum ErrorMessageEnum {
  NOT_DEFINED_ERROR_INSTANCE = "Not defined error instance",
}
