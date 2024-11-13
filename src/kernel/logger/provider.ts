import { injectable } from "inversify";
import { ILoggerOptions, ILoggerProvider } from "./types";
import pino from "pino";

// @injectable()
// export class PinoLoggerProvider implements ILoggerProvider {
//   createLogger(options: ILoggerOptions & { destination: string }): any {
//     const { destination, ...pinoOptions } = options;
//     return require("pino")(
//       pinoOptions,
//       pino.destination({
//         dest: destination,
//         sync: false,
//       }),
//     );
//   }
// }
@injectable()
export class PinoLoggerProvider implements ILoggerProvider {
  createLogger(options: ILoggerOptions & { destination: string }): any {
    const { destination, ...pinoOptions } = options;
    return pino(
      pinoOptions,
      pino.destination({
        dest: destination,
        sync: false,
      }),
    );
  }
}
