import { injectable } from "inversify";
import {
  ILoggerAdapter,
  ILoggerAdapterRegistry,
  LoggerAdapterType,
} from "../domain/types";

@injectable()
export class LoggerAdapterRegistry implements ILoggerAdapterRegistry {
  private readonly adapters = new Map<LoggerAdapterType, ILoggerAdapter>();

  register(type: LoggerAdapterType, adapter: ILoggerAdapter): void {
    if (!adapter) {
      throw new Error("Adapter cannot be null");
    }

    if (this.adapters.has(type)) {
      throw new Error(`Adapter for type ${type} is already registered`);
    }

    this.adapters.set(type, adapter);
  }

  getLogger(type: LoggerAdapterType): ILoggerAdapter {
    const adapter = this.adapters.get(type);
    if (!adapter) {
      throw new Error(`No adapter found for type ${type}`);
    }
    return adapter;
  }

  unregister(type: LoggerAdapterType): void {
    this.adapters.delete(type);
  }
}
