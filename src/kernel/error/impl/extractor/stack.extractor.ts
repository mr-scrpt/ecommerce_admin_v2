import * as stackTraceParser from "stacktrace-parser";
import { inject, injectable } from "inversify";
import { IFieldExtractor } from "../../domain/extractor/types";
import { ERROR_INJECTION_TOKENS } from "../../domain/di/tokens";
import type { IObjectUtils } from "../../domain/utils/types";
import { IStackFrame } from "@/shared/error/type";

@injectable()
export class StackExtractor implements IFieldExtractor<IStackFrame[]> {
  constructor(
    @inject(ERROR_INJECTION_TOKENS.ObjectUtils) private readonly utils: IObjectUtils,
  ) {}

  extract(error: unknown): IStackFrame[] {
    if (error instanceof Error && error.stack) {
      return this.parseStack(error.stack);
    }

    if (this.utils.hasProperty(error, "stack")) {
      const stack = String(error.stack);
      return this.parseStack(stack);
    }

    return [];
  }

  private parseStack(stack: string): IStackFrame[] {
    try {
      return stackTraceParser.parse(stack).map((frame) => ({
        fileName: frame.file || "unknown",
        lineNumber: frame.lineNumber || 0,
        columnNumber: frame.column || 0,
        functionName: frame.methodName || "anonymous",
        source: frame.file
          ? `${frame.file}:${frame.lineNumber}:${frame.column}`
          : undefined,
      }));
    } catch (e) {
      console.error("Failed to parse stack trace:", e);
      return [];
    }
  }
}
