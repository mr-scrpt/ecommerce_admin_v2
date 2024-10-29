import { ErrorApp, ErrorAppCombined } from "@/shared/error/error";

export class ValidateDataError extends ErrorAppCombined {
  constructor({ errors, cause }: { errors: Array<ErrorApp>; cause?: unknown }) {
    super({
      cause,
      errors,
    });
  }
}
