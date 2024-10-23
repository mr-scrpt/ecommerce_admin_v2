import { injectable } from "inversify";

@injectable()
export abstract class ILogger {
  // abstract debug(...args: any[]): void;
  abstract request(info: {
    path: string;
    type: string;
    durationMs: number;
    user: { id: string; name: string; lastName: string } | null;
    input?: any;
  }): void;
  // abstract warn(...args: any[]): void;
  // abstract error(errorList: Array<ErrorApp>): void;
  abstract error(errorList: {
    status: string;
    code: string;
    message: any;
  }): void;
}
