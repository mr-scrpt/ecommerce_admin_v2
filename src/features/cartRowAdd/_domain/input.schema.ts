import { z } from "zod";
import { selectorSchema } from "./schema";

export const addInputSchema = z.object({
  selector: selectorSchema,
});
