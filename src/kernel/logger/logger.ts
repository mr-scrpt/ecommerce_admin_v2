import { inject, injectable } from "inversify";
import type { ILogFormatter, ILogTransport, ILogger } from "./types";
import { LOGGER_INJECTION_TOKENS } from "./di";
import { IErrorAdapterResult } from "@/shared/error/type";

@injectable()
export class Logger implements ILogger {
  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LogFormatter)
    private formatter: ILogFormatter,
    @inject(LOGGER_INJECTION_TOKENS.LogTransport)
    private transport: ILogTransport,
  ) {}

  async error(error: IErrorAdapterResult): Promise<void> {
    const formatted = this.formatter.format(error);
    await this.transport.write(formatted);
  }

  async info(data: unknown): Promise<void> {}

  async warn(data: unknown): Promise<void> {}
}
