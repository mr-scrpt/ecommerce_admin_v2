import { IErrorAdapterResult } from "@/shared/error/type";
import { ILoggerAdapter } from "../../domain/types";
import { injectable } from "inversify";

@injectable()
export class NativeLoggerAdapter implements ILoggerAdapter {
  constructor() {}
  error(data: IErrorAdapterResult): void {
    console.error(data);
  }

  info(data: IErrorAdapterResult): void {
    console.info(data);
  }
}
// @injectable()
// export class NativeLoggerAdapter implements ILoggerAdapter {
//   private initialized: boolean = false;
//
//   constructor() {
//     this.initialized = true;
//     console.log("NativeLoggerAdapter constructor called");
//   }
//
//   error(data: IErrorAdapterResult): void {
//     this.validateInitialization();
//     console.error("NativeLogger Error:", data);
//   }
//
//   info(data: IErrorAdapterResult): void {
//     this.validateInitialization();
//     console.info("NativeLogger Info:", data);
//   }
//
//   private validateInitialization(): void {
//     if (!this.initialized) {
//       throw new Error("NativeLoggerAdapter not properly initialized");
//     }
//   }
//
//   // Метод для проверки состояния адаптера
//   getStatus(): { initialized: boolean } {
//     return {
//       initialized: this.initialized,
//     };
//   }
// }
