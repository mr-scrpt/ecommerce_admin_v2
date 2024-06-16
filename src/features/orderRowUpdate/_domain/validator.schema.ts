import { z } from "zod";
import { orderRowSelectorSchema, orderRowUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: orderRowSelectorSchema,
  orderRowData: orderRowUpdateSchema,
});
