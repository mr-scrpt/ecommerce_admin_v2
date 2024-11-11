import { z } from "zod";
import { IZodErrorDetails } from "../common/types";

export interface IErrorDetailsHandler {
  handle(error: z.ZodIssue): IZodErrorDetails;
}
