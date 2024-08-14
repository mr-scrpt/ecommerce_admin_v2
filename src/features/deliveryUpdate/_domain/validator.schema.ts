import { z } from "zod";
import { deliverySelectorSchema, deliveryUpdateSchema } from "./schema";
import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";

export const updateInputSchema = z.object({
  selector: deliverySelectorSchema,
  deliveryData: deliveryUpdateSchema.partial(),
});

export const updateDeliveryOutputSchema = deliverySchema;
