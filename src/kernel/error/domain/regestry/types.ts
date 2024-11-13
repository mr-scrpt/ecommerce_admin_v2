import { IErrorAdapter } from "../common/types";

export interface IErrorAdapterRegistry {
  register(adapter: IErrorAdapter): void;
  getAdapter(error: unknown): IErrorAdapter;
}
