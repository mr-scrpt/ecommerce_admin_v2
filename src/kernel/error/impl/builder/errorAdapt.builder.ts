import { ErrorAppLayer } from "@/shared/error/type";
import { inject, injectable } from "inversify";
import { IErrorAdapted } from "../../core/common/types";
import { TOKENS } from "../../core/di/tokens";
import type { IFieldExtractor } from "../../core/extractor/types";
import type { IObjectUtils } from "../../core/utils/types";
import { CommonErrorNameEnum } from "../../errors/error.common";

@injectable()
export class ErrorAdaptBuilder {
  constructor(
    @inject(TOKENS.TimestampExtractor)
    private readonly timestampExtractor: IFieldExtractor<Date>,
    @inject(TOKENS.MessageExtractor)
    private readonly messageExtractor: IFieldExtractor<string>,
    @inject(TOKENS.LayerExtractor)
    private readonly layerExtractor: IFieldExtractor<ErrorAppLayer>,
    @inject(TOKENS.ObjectUtils)
    private readonly serviceUtils: IObjectUtils,
  ) {}

  buildAdaptedError(error: unknown): IErrorAdapted {
    return {
      layer: this.layerExtractor.extract(error),
      timestamp: this.timestampExtractor.extract(error),
      name: this.serviceUtils.getPropertySafely(
        error,
        "name",
        CommonErrorNameEnum.UNEXPECTED_ERROR,
      ),
      message: this.messageExtractor.extract(error),
      ...this.extractOptionalFields(error),
    };
  }

  private extractOptionalFields(error: unknown): Record<string, unknown> {
    if (
      this.serviceUtils.hasProperty(error, "details") &&
      error.details !== null &&
      error.details !== undefined
    ) {
      return { details: String(error.details) };
    }
    return {};
  }
}
