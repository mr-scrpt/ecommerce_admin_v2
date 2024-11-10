import { IErrorAdapterResult } from "../common/types";

export interface IErrorAdapterFacade {
  adaptError(error: unknown): IErrorAdapterResult;
}
