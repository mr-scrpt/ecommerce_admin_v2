import { inject, injectable } from "inversify";
import { IFieldExtractor } from "../../domain/extractor/types";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import type { IObjectUtils } from "../../domain/utils/types";
import { CommonErrorMessageEnum } from "../../errors/error.common";

@injectable()
export class MessageExtractor implements IFieldExtractor<string> {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ObjectUtils) private readonly utils: IObjectUtils,
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
