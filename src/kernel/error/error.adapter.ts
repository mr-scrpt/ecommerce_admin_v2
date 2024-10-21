import { ErrorApp } from "@/shared/error/error";
import { ZodError, ZodIssue } from "zod";

// export interface IZodErrorAdapter {
//   adapt(zodError: ZodError): ErrorApp;
// }

export class ZodErrorAdapter extends ErrorApp {
  constructor(zodError: ZodError) {
    super({
      message: ZodErrorAdapter.formatZodErrors(zodError.errors),
      code: "PARSE_ERROR",
      cause: zodError,
    });
  }
  private static formatZodErrors(errors: ZodIssue[]): string {
    type Formatter = (err: ZodIssue) => string | undefined;

    const fieldFormatters: Record<string, Formatter> = {
      spot: () => `[Spot: ZOD Validate Schema]`,
      code: (err) => err.code && `[Code: ${err.code}]`,
      path: (err) =>
        err.path.length > 0 ? `[Path: ${err.path.join(".")}]` : undefined,
      message: (err) => err.message && `[Message: ${err.message}]`,
      expected: (err) =>
        "expected" in err ? `[Expected: ${(err as any).expected}]` : undefined,
      received: (err) =>
        "received" in err ? `[Received: ${(err as any).received}]` : undefined,
    };

    return errors
      .map((err) =>
        Object.values(fieldFormatters)
          .map((formatter) => formatter(err))
          .filter((part): part is string => part !== undefined)
          .join(" "),
      )
      .join(", ");
  }
}
