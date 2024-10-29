import {
  AppErrorCombinedOptions,
  AppErrorOptions,
  ErrorAppAbstract,
  ErrorAppCombinedAbstract,
} from "./type";

export class ErrorApp extends ErrorAppAbstract {
  constructor(opts: AppErrorOptions) {
    super(opts);
  }
}

export class ErrorAppCombined extends ErrorAppCombinedAbstract {
  constructor(opts: AppErrorCombinedOptions) {
    super(opts);
  }
}
