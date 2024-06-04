import { z } from "zod";
import { cartRowUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  cartRowData: cartRowUpdateSchema,
});
