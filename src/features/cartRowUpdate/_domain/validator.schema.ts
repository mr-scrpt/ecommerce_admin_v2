import { z } from "zod";
import { cartRowSelectorSchema, cartRowUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: cartRowSelectorSchema,
  cartRowData: cartRowUpdateSchema.partial(),
});
