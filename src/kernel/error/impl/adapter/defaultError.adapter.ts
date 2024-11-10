import { injectable } from "inversify";
import {
  ErrorMessageEnum,
  IErrorAdapter,
  IErrorAdapterResult,
} from "../../core/common/types";

@injectable()
export class DefaultErrorAdapter implements IErrorAdapter {
  canAdapt(_: unknown): boolean {
    return true;
  }

  adapt(_: unknown): IErrorAdapterResult {
    return {
      messageList: JSON.stringify([ErrorMessageEnum]),
      errorList: [],
    };
  }
}
