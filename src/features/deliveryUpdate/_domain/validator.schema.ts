import { z } from "zod";
import { deliverySelectorSchema, deliveryUpdateSchema } from "./schema";

export const updateInputSchema = z.object({
  selector: deliverySelectorSchema,
  deliveryData: deliveryUpdateSchema.partial(),
});
