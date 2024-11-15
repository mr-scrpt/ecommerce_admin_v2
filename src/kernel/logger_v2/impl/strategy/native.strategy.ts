import { inject, injectable } from "inversify";
import { LOGGER_INJECTION_TOKENS } from "../../domain/di";
import type {
  ILoggerAdapter,
  ILoggerNativeAdapter,
  ILoggerStrategy,
} from "../../domain/types";
import { LoggerAdapterType } from "../../domain/types";
import { NativeLoggerAdapter } from "../adapter/native.adapter";

@injectable()
export class NativeLoggerStrategy implements ILoggerStrategy {
  readonly type = LoggerAdapterType.NATIVE_CONSOLE;

  constructor(
    @inject(LOGGER_INJECTION_TOKENS.LoggerToNative)
    private readonly adapter: ILoggerNativeAdapter,
  ) {
    console.log(
      "output_log: NATIVE LOGGER STRATEGY CONSTRUCTOR  =>>>",
      adapter,
    );
  }

  createLogger(): ILoggerAdapter {
    return this.adapter;
  }
}
// @injectable()
// export class NativeLoggerStrategy implements ILoggerStrategy {
//   readonly type = LoggerAdapterType.NATIVE_CONSOLE;
//
//   constructor(
//     @inject(LOGGER_INJECTION_TOKENS.LoggerToNative)
//     private readonly adapter: ILoggerNativeAdapter,
//   ) {
//     console.log(
//       "output_log: NATIVE LOGGER STRATEGY CONSTRUCTOR =>>>",
//       adapter,
//       "\nAdapter status:",
//       (adapter as NativeLoggerAdapter).getStatus?.(),
//     );
//
//     this.validateAdapter();
//   }
//
//   private validateAdapter(): void {
//     if (!this.adapter) {
//       throw new Error("NativeLoggerAdapter not injected");
//     }
//
//     // Проверяем методы
//     if (
//       typeof this.adapter.error !== "function" ||
//       typeof this.adapter.info !== "function"
//     ) {
//       throw new Error("NativeLoggerAdapter missing required methods");
//     }
//   }
//
//   createLogger(): ILoggerAdapter {
//     this.validateAdapter();
//     return this.adapter;
//   }
// }
