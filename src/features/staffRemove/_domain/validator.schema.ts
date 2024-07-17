import { z } from "zod";
import { staffSelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: staffSelectorSchema,
});
