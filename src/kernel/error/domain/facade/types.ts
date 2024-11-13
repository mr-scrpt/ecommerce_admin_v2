import { IErrorAdapterResult } from "@/shared/error/type";

export interface IErrorAdapterFacade {
  adaptError(error: unknown): IErrorAdapterResult;
}
