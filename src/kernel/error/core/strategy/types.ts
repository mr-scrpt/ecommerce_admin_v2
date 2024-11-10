import { z } from "zod";
import { IZodErrorDetails } from "../common/types";

export interface IErrorDetailsStrategy {
  canHandle(error: z.ZodIssue): boolean;
  handle(error: z.ZodIssue): Partial<IZodErrorDetails>;
}

export type ZodErrorCode = keyof typeof z.ZodIssueCode;

export const ERROR_NAME_MAP = Object.fromEntries(
  Object.entries(z.ZodIssueCode).map(([key]) => [
    key,
    z.ZodIssueCode[key as ZodErrorCode],
  ]),
) as Record<ZodErrorCode, string>;
