import { z } from "zod";
import { orderRowCreateSchema, orderRowTargetSchema } from "./schema";

export const createInputSchema = z.object({
  target: orderRowTargetSchema,
  orderRowData: orderRowCreateSchema,
});
