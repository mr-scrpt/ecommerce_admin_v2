import { z } from "zod";
import { cartRowSelectorSchema } from "./schema";

export const removeInputSchema = z.object({
  selector: cartRowSelectorSchema,
});
