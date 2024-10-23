import { Logger } from "pino";

export const LOGGER_TYPES = {
  LoggerConfig: Symbol.for("LoggerConfig"),
  LoggerConfigFactory: Symbol.for("LoggerConfigFactory"),
  Logger: Symbol.for("Logger"),
};

export enum LoggerType {
  ERROR = "error",
  ACCESS = "access",
}

export interface ILoggerConfigFactory {
  getLogger(type: LoggerType): Logger;
}

export interface ILoggerRequestParams {
  path: string;
  type: string;
  durationMs: number;
  user: { id: string; name: string; lastName: string } | null;
  input?: any;
}

export interface ILoggerErrorParams {
  status: string;
  code: string;
  message: any;
}
