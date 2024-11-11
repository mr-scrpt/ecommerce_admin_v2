import { interfaces } from "inversify";
import { ILoggerConfigStrategy, LoggerType } from "../types";
import { AccessConfigStrategy } from "./accessConfig.strategy";
import { ErrorConfigStrategy } from "./errorConfig.strategy";

export const loggerConfigStrategies = new Map<
  LoggerType,
  interfaces.Newable<ILoggerConfigStrategy>
>([
  [LoggerType.ERROR, ErrorConfigStrategy],
  [LoggerType.ACCESS, AccessConfigStrategy],
]);
