import { injectable } from "inversify";

@injectable()
export abstract class ILogger {
  abstract debug(...args: any[]): void;
  abstract info(...args: any[]): void;
  abstract warn(...args: any[]): void;
  abstract error(...args: any[]): void;
}
