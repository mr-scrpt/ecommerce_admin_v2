import { ILoggerConfig } from "@/shared/config/logger.config";
import { IErrorAdapted, IErrorAdapterResult } from "@/shared/error/type";
import path from "path";
import pino from "pino";

interface ILogger {
  error(data: IErrorAdapterResult): void;
  info(data: IErrorAdapterResult): void;
}

interface IFileLoggerConfig {
  filename: string;
  directory: string;
  maxSize: string;
  level: string;
  colorize: boolean;
  translateTime: string;
  ignore: string;
  messageFormat: string;
}

interface ILoggerCreator {
  create(config: ILoggerConfig): ILogger;
}

// Декоратор для вывода в консоль через pino-pretty
class PinoConsoleDecorator implements ILogger {
  private consoleLogger: pino.Logger;

  constructor(
    private readonly logger: ILogger,
    config: ILoggerConfig,
  ) {
    this.consoleLogger = this.createConsoleLogger(config);
  }

  private createConsoleLogger(config: ILoggerConfig): pino.Logger {
    return pino({
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: config.ERROR_LOG_COLORIZE,
          translateTime: config.ERROR_LOG_TRANSLATE_TIME,
          ignore: "pid,hostname,stack,messageList", // игнорируем ненужные поля
          messageFormat: config.ERROR_LOG_MESSAGE_FORMAT,
        },
      },
    });
  }

  private formatErrorForConsole(error: IErrorAdapted): Partial<IErrorAdapted> {
    const { stack, ...errorWithoutStack } = error;
    return {
      ...errorWithoutStack,
      timestamp: new Date(error.timestamp),
    };
  }

  private formatErrorResultForConsole(
    data: IErrorAdapterResult,
  ): Record<string, unknown> {
    return {
      errors: data.errorList.map((error) => this.formatErrorForConsole(error)),
    };
  }

  error(data: IErrorAdapterResult): void {
    this.logger.error(data);

    const consoleData = this.formatErrorResultForConsole(data);
    this.consoleLogger.error(consoleData);
  }

  info(data: IErrorAdapterResult): void {
    this.logger.info(data);

    const consoleData = this.formatErrorResultForConsole(data);
    this.consoleLogger.info(consoleData);
  }
}

class PinoFileLoggerWithPrettyConsoleCreator implements ILoggerCreator {
  create(config: ILoggerConfig): ILogger {
    const baseLogger = new PinoFileLoggerAdapter(config);
    return new PinoConsoleDecorator(baseLogger, config);
  }
}

class PinoFileLoggerAdapter implements ILogger {
  private errorLogger: pino.Logger;
  private accessLogger: pino.Logger;

  constructor(config: ILoggerConfig) {
    const errorFileConfig = this.createFileConfig(config, {
      filename: config.ERROR_LOG_FILENAME,
      level: config.ERROR_LOG_LEVEL_ERROR,
    });

    const accessFileConfig = this.createFileConfig(config, {
      filename: config.ACCESS_LOG_FILENAME,
      level: config.ACCESS_LOG_LEVEL_INFO,
    });

    this.errorLogger = this.createLogger(errorFileConfig);
    this.accessLogger = this.createLogger(accessFileConfig);
  }

  private createFileConfig(
    config: ILoggerConfig,
    specificConfig: { filename: string; level: string },
  ): IFileLoggerConfig {
    return {
      filename: specificConfig.filename,
      directory: config.ERROR_LOG_DESTINATION_CATALOG,
      maxSize: config.ERROR_LOG_MAX_SIZE,
      level: specificConfig.level,
      colorize: config.ERROR_LOG_COLORIZE,
      translateTime: config.ERROR_LOG_TRANSLATE_TIME,
      ignore: config.ERROR_LOG_IGNORE,
      messageFormat: config.ERROR_LOG_MESSAGE_FORMAT,
    };
  }

  private createLogger(config: IFileLoggerConfig): pino.Logger {
    const destination = path.join(config.directory, config.filename);

    return pino(
      {
        level: config.level,
        transport: {
          target: "pino/file",
          options: {
            destination,
            mkdir: true,
            sync: false,
          },
        },
        formatters: {
          level: (label) => ({ level: label }),
        },
        timestamp:
          config.translateTime === "true"
            ? pino.stdTimeFunctions.isoTime
            : undefined,
        messageKey: config.messageFormat,
      },
      pino.destination(destination),
    );
  }

  error(data: IErrorAdapterResult): void {
    this.errorLogger.error(data);
  }

  info(data: IErrorAdapterResult): void {
    this.accessLogger.info(data);
  }
}

class PinoFileLoggerCreator implements ILoggerCreator {
  create(config: ILoggerConfig): ILogger {
    return new PinoFileLoggerAdapter(config);
  }
}

class ConsoleLoggerAdapter implements ILogger {
  error(data: IErrorAdapterResult): void {
    console.error(data);
  }

  info(data: IErrorAdapterResult): void {
    console.info(data);
  }
}

class ConsoleLoggerCreator {
  create(): ILogger {
    return new ConsoleLoggerAdapter();
  }
}

class PinoConsoleLoggerAdapter implements ILogger {
  private errorLogger: pino.Logger;
  private accessLogger: pino.Logger;

  constructor(config: ILoggerConfig) {
    const errorFileConfig = this.createFileConfig(config, {
      filename: config.ERROR_LOG_FILENAME,
      level: config.ERROR_LOG_LEVEL_ERROR,
    });

    const accessFileConfig = this.createFileConfig(config, {
      filename: config.ACCESS_LOG_FILENAME,
      level: config.ACCESS_LOG_LEVEL_INFO,
    });

    this.errorLogger = this.createLogger(errorFileConfig);
    this.accessLogger = this.createLogger(accessFileConfig);
  }

  private createFileConfig(
    config: ILoggerConfig,
    specificConfig: { filename: string; level: string },
  ): IFileLoggerConfig {
    return {
      filename: specificConfig.filename,
      directory: config.ERROR_LOG_DESTINATION_CATALOG,
      maxSize: config.ERROR_LOG_MAX_SIZE,
      level: specificConfig.level,
      colorize: config.ERROR_LOG_COLORIZE,
      translateTime: config.ERROR_LOG_TRANSLATE_TIME,
      ignore: config.ERROR_LOG_IGNORE,
      messageFormat: config.ERROR_LOG_MESSAGE_FORMAT,
    };
  }

  private createLogger(config: IFileLoggerConfig): pino.Logger {
    return pino({
      level: config.level,
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
      formatters: {
        level: (label) => ({ level: label }),
      },
      transport: {
        target: "pino-pretty",
        options: {
          colorize: config.colorize,
          translateTime: config.translateTime,
          ignore: config.ignore,
          messageFormat: config.messageFormat,
        },
      },
    });
  }
  error(data: IErrorAdapterResult): void {
    this.errorLogger.error(data);
  }

  info(data: IErrorAdapterResult): void {
    this.accessLogger.info(data);
  }
}

class PinoConsoleLoggerCreator implements ILoggerCreator {
  create(config: ILoggerConfig): ILogger {
    return new PinoConsoleLoggerAdapter(config);
  }
}

enum LoggerAdapterType {
  PINO_FILE_WITH_PRETTY_CONSOLE = "PINO_FILE_WITH_PRETTY_CONSOLE",
  PINO_FILE = "PINO_FILE",
  PINO_CONSOLE = "PINO_CONSOLE",
  NATIVE_CONSOLE = "NATIVE_CONSOLE",
}

class LoggerRegestry {
  private static loggers: Map<LoggerAdapterType, ILoggerCreator> = new Map();

  static register(type: LoggerAdapterType, creator: ILoggerCreator): void {
    this.loggers.set(type, creator);
  }

  static unregister(type: LoggerAdapterType): void {
    this.loggers.delete(type);
  }

  static getCreator(type: LoggerAdapterType): ILoggerCreator {
    const creator = this.loggers.get(type);
    if (!creator) {
      throw new Error(`Logger type ${type} is not registered`);
    }
    return creator;
  }
}

LoggerRegestry.register(
  LoggerAdapterType.PINO_FILE_WITH_PRETTY_CONSOLE,
  new PinoFileLoggerWithPrettyConsoleCreator(),
);

LoggerRegestry.register(
  LoggerAdapterType.PINO_FILE,
  new PinoFileLoggerCreator(),
);
LoggerRegestry.register(
  LoggerAdapterType.PINO_CONSOLE,
  new PinoConsoleLoggerCreator(),
);
LoggerRegestry.register(
  LoggerAdapterType.NATIVE_CONSOLE,
  new ConsoleLoggerCreator(),
);

export class LoggerAdapterFactory {
  static createAdapter(
    type: LoggerAdapterType,
    config: ILoggerConfig,
  ): ILogger {
    const logger = LoggerRegestry.getCreator(type);
    const loggerInstance = logger.create(config);
    return loggerInstance;
  }
}

export class LoggerService {
  private logger: ILogger;

  constructor(config: ILoggerConfig, adaterType: LoggerAdapterType) {
    this.logger = LoggerAdapterFactory.createAdapter(adaterType, config);
  }

  createLogger() {
    return this.logger;
  }
}

// export const loggerComplex = LoggerAdapterFactory.createAdapter(
//   LoggerAdapterType.PINO_FILE_WITH_PRETTY_CONSOLE,
//   loggerConfig,
// );

// export const loggerPino = LoggerAdapterFactory.createAdapter(
//   LoggerAdapterType.PINO_CONSOLE,
//   loggerConfig,
// );
//
// export const loggerPinoFile = LoggerAdapterFactory.createAdapter(
//   LoggerAdapterType.PINO_FILE,
//   loggerConfig,
// );
//
// export const loggerNative = LoggerAdapterFactory.createAdapter(
//   LoggerAdapterType.NATIVE_CONSOLE,
//   loggerConfig,
// );
