import { z } from "zod";

export interface IErrorDetailsHandler {
  handle(error: z.ZodIssue): IZodErrorDetails;
}
