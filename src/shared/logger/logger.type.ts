import { injectable } from "inversify";

@injectable()
export abstract class ILogger {
  abstract request(info: {
    path: string;
    type: string;
    durationMs: number;
    user: { id: string; name: string; lastName: string } | null;
    input?: any;
  }): void;
  abstract error(errorList: {
    status: string;
    code: string;
    message: any;
  }): void;
}
