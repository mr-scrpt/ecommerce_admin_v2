import { ERROR_APP_LAYER, ErrorAppLayer } from "@/shared/error/type";
import { inject, injectable } from "inversify";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import { IFieldExtractor } from "../../domain/extractor/types";
import type { IObjectUtils } from "../../domain/utils/types";

@injectable()
export class LayerExtractor implements IFieldExtractor<ErrorAppLayer> {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ObjectUtils) private readonly utils: IObjectUtils,
  ) {}

  extract(error: unknown): ErrorAppLayer {
    return this.utils.getPropertySafely(
      error,
      "layer",
      ERROR_APP_LAYER.EXTERNAL,
    );
  }
}
