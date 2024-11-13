import { injectable } from "inversify";
import { ErrorMessageEnum, IErrorAdapter } from "../../domain/common/types";
import { IErrorAdapterResult } from "@/shared/error/type";

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
