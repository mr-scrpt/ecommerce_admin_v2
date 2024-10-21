import { injectable } from "inversify";
import { ILogger } from "../../../shared/logger/logger.type";
import { ErrorApp } from "@/shared/error/error";
import pino from "pino";

@injectable()
export class LoggerImpl implements ILogger {
  private logger = pino({
    transport: {
      targets: [
        {
          target: "pino/file",
          options: { destination: `${process.cwd()}/logs/errors.log` },
        },
        {
          target: "pino-pretty",

          options: {
            colorize: true,
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
            ignore: "pid,hostname,args",
            // messageFormat: "{msg} - {args}",
            messageFormat: "{msg}",
          },
        },
      ],
    },
  });

  info(message: string, ...args: any[]): void {
    this.logger.info({ msg: message, args });
  }

  warn(message: string, ...args: any[]): void {
    this.logger.warn({ msg: message, args });
  }

  error(errorList: Array<ErrorApp>): void {
    const message = errorList.map((e) => e.message).join(", ");
    this.logger.error({ msg: message, args: errorList });
  }

  debug(message: string, ...args: any[]): void {
    this.logger.debug({ msg: message, args });
  }
}
