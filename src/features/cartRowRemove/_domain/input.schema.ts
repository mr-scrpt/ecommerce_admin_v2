import { z } from "zod";
import { cartRowRemoveSchema } from "./schema";

export const removeInputSchema = z.object({
  cartRowData: cartRowRemoveSchema,
});
