import { IErrorAdapterResult } from "@/shared/error/type";

export interface ILoggerAdapter {
  error(data: IErrorAdapterResult): void;
  info(data: IErrorAdapterResult): void;
}
export interface ILogger extends ILoggerAdapter {}

export interface ILoggerFileAdapter extends ILoggerAdapter {}
export interface ILoggerConsoleAdapter extends ILoggerAdapter {}
export interface ILoggerCombineAdapter extends ILoggerAdapter {}
export interface ILoggerNativeAdapter extends ILoggerAdapter {}

export interface IFileLoggerConfig {
  filename: string;
  directory: string;
  maxSize: string;
  level: string;
  colorize: boolean;
  translateTime: string;
  ignore: string;
  messageFormat: string;
}

export enum LoggerAdapterType {
  PINO_COMBINE = "PINO_COMBINE",
  PINO_FILE = "PINO_FILE",
  PINO_CONSOLE = "PINO_CONSOLE",
  NATIVE_CONSOLE = "NATIVE_CONSOLE",
}

export interface ILoggerAdapterRegistry {
  register(type: LoggerAdapterType, adapter: ILoggerAdapter): void;
  getLogger(type: LoggerAdapterType): ILoggerAdapter;
}
export interface ILoggerService {
  getLogger(type: LoggerAdapterType): ILogger;
}

export interface ILoggerStrategy {
  type: LoggerAdapterType;
  createLogger(): ILoggerAdapter;
}

export interface ILoggerAdapterManager {
  initialize(): void;
}
