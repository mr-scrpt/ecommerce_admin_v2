import { z } from "zod";
import { IErrorDetailsStrategy } from "../../core/strategy/types";
import { IZodErrorDetails } from "../../core/common/types";
import { injectable } from "inversify";

@injectable()
export class InvalidTypeStrategy implements IErrorDetailsStrategy {
  canHandle(error: z.ZodIssue): boolean {
    return error.code === z.ZodIssueCode.invalid_type;
  }

  handle(error: z.ZodIssue): Partial<IZodErrorDetails> {
    const typedError = error as z.ZodInvalidTypeIssue;
    return {
      received: typedError.received,
      expected: typedError.expected,
    };
  }
}

@injectable()
export class InvalidEnumStrategy implements IErrorDetailsStrategy {
  canHandle(error: z.ZodIssue): boolean {
    return error.code === z.ZodIssueCode.invalid_enum_value;
  }

  handle(error: z.ZodIssue): Partial<IZodErrorDetails> {
    const typedError = error as z.ZodInvalidEnumValueIssue;
    return {
      received: typedError.received,
      expected: typedError.options,
    };
  }
}

@injectable()
export class SizeConstraintStrategy implements IErrorDetailsStrategy {
  canHandle(error: z.ZodIssue): boolean {
    return (
      error.code === z.ZodIssueCode.too_small ||
      error.code === z.ZodIssueCode.too_big
    );
  }

  handle(error: z.ZodIssue): Partial<IZodErrorDetails> {
    if (error.code === z.ZodIssueCode.too_small) {
      const typedError = error as z.ZodTooSmallIssue;
      return {
        received: typedError.minimum,
        expected: typedError.minimum,
        type: typedError.type as IZodErrorDetails["type"],
      };
    } else {
      const typedError = error as z.ZodTooBigIssue;
      return {
        received: typedError.maximum,
        expected: typedError.maximum,
        type: typedError.type as IZodErrorDetails["type"],
      };
    }
  }
}
