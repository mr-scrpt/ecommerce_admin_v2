import { inject, injectable } from "inversify";
import { IFieldExtractor } from "../../core/extractor/types";
import { ERROR_INJECTION_TOKENS } from "../../core/di/tokens";
import type { IObjectUtils } from "../../core/utils/types";

@injectable()
export class TimestampExtractor implements IFieldExtractor<Date> {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ObjectUtils) private readonly utils: IObjectUtils,
  ) {}
  extract(error: unknown): Date {
    if (this.utils.hasProperty(error, "timestamp")) {
      const timestamp = error.timestamp;

      if (timestamp instanceof Date) {
        return timestamp;
      }

      if (typeof timestamp === "string" || typeof timestamp === "number") {
        const parsedDate = new Date(timestamp);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }
    return new Date();
  }
}
