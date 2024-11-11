import { injectable } from "inversify";
import { ILogFormatter } from "./types";
import { IErrorAdapterResult } from "@/shared/error/type";

@injectable()
export class ErrorLogFormatter implements ILogFormatter {
  format(error: IErrorAdapterResult): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      messageList: error.messageList,
      errors: error.errorList.map((err) => ({
        layer: err.layer,
        name: err.name,
        message: err.message,
        details: err.details,
        stack: err.stack,
      })),
    });
  }
}
