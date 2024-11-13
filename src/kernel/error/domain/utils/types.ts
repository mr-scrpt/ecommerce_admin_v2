export interface IObjectUtils {
  hasProperty(obj: unknown, prop: string): obj is { [key: string]: unknown };
  getPropertySafely<T>(obj: unknown, prop: string, defaultValue: T): T;
}
