import { z } from "zod";
import { cartRowAddSchema } from "./schema";

export const addInputSchema = z.object({
  cartRowData: cartRowAddSchema,
});
