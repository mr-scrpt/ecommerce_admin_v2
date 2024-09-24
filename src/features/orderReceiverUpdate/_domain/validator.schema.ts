import { z } from "zod";
import { orderReceiverBindSchema, orderSelectorSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: orderSelectorSchema,
  orderReceiverData: orderReceiverBindSchema,
});
