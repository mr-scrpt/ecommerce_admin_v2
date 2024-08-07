import { ErrorCodeKeyType } from "@/kernel/lib/trpc/_status";

const APP_ERROR = "App Error";

export abstract class ErrorApp extends Error {
  public override readonly cause?: Error;
  public readonly code;

  constructor(opts: {
    message?: string;
    code: ErrorCodeKeyType;
    cause?: unknown;
  }) {
    const cause = opts.cause;
    const message = opts.message ?? opts.code;

    super(message, { cause });

    this.code = opts.code;
    this.name = APP_ERROR;
  }
}
