import { injectable } from "inversify";
import { IObjectUtils } from "../domain/utils/types";

@injectable()
export class ObjectUtils implements IObjectUtils {
  hasProperty(obj: unknown, prop: string): obj is { [key: string]: unknown } {
    return obj !== null && typeof obj === "object" && prop in obj;
  }

  getPropertySafely<T>(obj: unknown, prop: string, defaultValue: T): T {
    if (this.hasProperty(obj, prop)) {
      const value = obj[prop];
      if (value !== null && value !== undefined) {
        return value as T;
      }
    }
    return defaultValue;
  }
}
