import { z } from "zod";
import { productSelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: productSelectorSchema,
});
