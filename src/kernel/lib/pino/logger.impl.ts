import { injectable } from "inversify";
import pino from "pino";
import { ILogger } from "../../../shared/logger/logger.type";

@injectable()
export class LoggerImpl implements ILogger {
  private errorLogger = pino({
    level: "error",
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
            messageFormat: "{msg}",
          },
        },
      ],
    },
  });

  private accessLogger = pino({
    level: "info",
    transport: {
      targets: [
        {
          target: "pino/file",
          options: { destination: `${process.cwd()}/logs/access.log` },
        },
        {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
            ignore: "pid,hostname,args",
            messageFormat: "{msg}",
          },
        },
      ],
    },
  });

  error(error: { status: string; code: string; message: any }): void {
    this.errorLogger.error({ msg: error.message, args: error });
  }

  request(info: {
    path: string;
    type: string;
    durationMs: number;
    user: { id: string; name: string; lastName: string } | null;
    input?: any;
  }): void {
    const { user } = info;
    const msg = `[${info.durationMs}ms] ${user ? `USER_ID: ${user.id}, USER_NAME: ${user.name}, USER_LAST_NAME: ${user.lastName}` : null} Request type [${info.type.toUpperCase()}] to [${info.path}]`;
    this.accessLogger.info({
      msg,
      args: info,
    });
  }
}
