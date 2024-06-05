import { z } from "zod";
import { categorySelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: categorySelectorSchema,
});
