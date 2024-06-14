import { z } from "zod";
import { propertySelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: propertySelectorSchema,
});
