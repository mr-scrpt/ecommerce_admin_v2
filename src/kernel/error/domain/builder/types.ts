import { IErrorAdapterResult } from "@/shared/error/type";

export interface IErrorAdaptBuilder {
  build(error: unknown): IErrorAdapterResult;
}
