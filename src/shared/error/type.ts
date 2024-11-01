import { ErrorCodeKeyType } from "@/kernel/lib/trpc/_status";

export const ERROR_NAME = {
  APP: "App Error",
  COMBINDED: "Error Combinded",
};

export type AppErrorOptions = {
  code: ErrorCodeKeyType;
  message: string;
  cause?: unknown;
};

export type LayerErrorOptions = {
  cause?: unknown;
};

export type AppErrorCombinedOptions = {
  // message: string;
  errors: Array<ErrorAppAbstract>;
  text?: string;
  cause?: unknown;
};

export abstract class ErrorAppAbstract extends Error {
  public readonly code: ErrorCodeKeyType;

  constructor(opts: AppErrorOptions) {
    const { message, code, cause } = opts;
    super(message, { cause });
    Object.setPrototypeOf(this, new.target.prototype);
    this.code = code;
    this.name = ERROR_NAME.APP;
  }
}

export abstract class ErrorAppCombinedAbstract extends Error {
  public readonly errors: Array<ErrorAppAbstract>;
  public readonly text?: string;

  constructor(opts: AppErrorCombinedOptions) {
    const { errors, text, cause } = opts;
    super("Error App Combined Abstract Constructor", { cause });
    Object.setPrototypeOf(this, new.target.prototype);

    this.errors = errors;
    this.text = text;
    this.name = ERROR_NAME.COMBINDED;
  }
}
