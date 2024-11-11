export interface ILogger {
  error(data: unknown): void;
  info(data: unknown): void;
  warn(data: unknown): void;
}
export enum LoggerType {
  ERROR = "error",
  ACCESS = "access",
}

export interface ILoggerConfigStrategy {
  getDestination(): ILogDestination;
  getOptions(): ILoggerOptions;
}

// export interface ILoggerFactory {
//   createLogger(type: LoggerType): ILogger;
// }
export interface ILoggerFactory {
  createLogger(type: LoggerType): ILogger;
}

// export interface ILoggerOptions {
//   name: string;
//   level: string;
//   filepath: string;
// }
export interface IFileTransportOptions {
  destination: string;
  level: string;
  colorize: boolean;
  translateTime: string;
  ignore: string;
  messageFormat: string;
}

export interface ILogFormatter {
  format(data: unknown): string;
}

export interface IRotationStrategy {
  shouldRotate(filepath: string): Promise<boolean>;
  rotate(filepath: string): Promise<void>;
}

export interface ILogDestination {
  catalog: string;
  filename: string;
}

export interface ILoggerOptions {
  level: string;
  colorize: boolean;
  translateTime: string;
  ignore: string;
  messageFormat: string;
}

export interface ILogTransport {
  write(data: string): Promise<void>;
}
export interface ILoggerProvider {
  createLogger(options: ILoggerOptions & { destination: string }): any;
}
