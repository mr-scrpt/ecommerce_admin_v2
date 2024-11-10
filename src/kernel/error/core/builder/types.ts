import { IErrorAdapted } from "../common/types";

export interface IErrorBuilder {
  buildAdaptedError(error: unknown): IErrorAdapted;
}
