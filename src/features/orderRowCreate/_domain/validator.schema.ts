import { z } from "zod";
import { orderRowCreateSchema, orderRowSelectorSchema } from "./schema";

export const createInputSchema = z.object({
  selector: orderRowSelectorSchema,
  orderRowData: orderRowCreateSchema,
});
