import { z } from "zod";
import { storeSelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: storeSelectorSchema,
});
