import { z } from "zod";
import { staffSelectorSchema, staffUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: staffSelectorSchema,
  staffData: staffUpdateSchema,
});
