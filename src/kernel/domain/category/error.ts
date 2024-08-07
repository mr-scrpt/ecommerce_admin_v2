import { ErrorApp } from "@/shared/error/error";
import { HTTP_STATUS } from "@/kernel/lib/trpc/_status";

enum ErrorMessageEnum {
  CATEGORY_NOT_FOUND = "Category not found=)",
}

export class CategoryNotFoundError extends ErrorApp {
  constructor(cause?: unknown) {
    super({
      code: HTTP_STATUS.NOT_FOUND,
      message: ErrorMessageEnum.CATEGORY_NOT_FOUND,
      cause,
    });
  }
}
