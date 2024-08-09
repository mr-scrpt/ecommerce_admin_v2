import { z } from "zod";
import { storeSelectorSchema, storeUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: storeSelectorSchema,
  storeData: storeUpdateSchema.partial(),
});
