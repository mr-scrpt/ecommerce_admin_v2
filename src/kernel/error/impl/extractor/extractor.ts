import { ERROR_APP_LAYER, ErrorAppLayer } from "@/shared/error/type";
import { inject, injectable } from "inversify";
import { TOKENS } from "../../core/di/tokens";
import type { IObjectUtils } from "../../core/utils/types";
import { CommonErrorMessageEnum } from "../../errors/error.common";

export interface IFieldExtractor<T> {
  extract(error: unknown): T;
}

@injectable()
export class TimestampExtractor implements IFieldExtractor<Date> {
  constructor(
    @inject(TOKENS.ObjectUtils) private readonly utils: IObjectUtils,
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

@injectable()
export class MessageExtractor implements IFieldExtractor<string> {
  constructor(
    @inject(TOKENS.ObjectUtils) private readonly utils: IObjectUtils,
  ) {}

  extract(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (this.utils.hasProperty(error, "message")) {
      return String(error.message);
    }

    return String(CommonErrorMessageEnum.UNEXPECTED_ERROR);
  }
}

@injectable()
export class LayerExtractor implements IFieldExtractor<ErrorAppLayer> {
  constructor(
    @inject(TOKENS.ObjectUtils) private readonly utils: IObjectUtils,
  ) {}

  extract(error: unknown): ErrorAppLayer {
    return this.utils.getPropertySafely(
      error,
      "layer",
      ERROR_APP_LAYER.EXTERNAL,
    );
  }
}
