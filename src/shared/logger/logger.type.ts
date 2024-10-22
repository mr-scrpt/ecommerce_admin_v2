import { injectable } from "inversify";
import { ErrorApp } from "../error/error";

@injectable()
export abstract class ILogger {
  // abstract debug(...args: any[]): void;
  // abstract info(...args: any[]): void;
  // abstract warn(...args: any[]): void;
  // abstract error(errorList: Array<ErrorApp>): void;
  abstract error(errorList: {
    status: string;
    code: string;
    message: any;
  }): void;
}
