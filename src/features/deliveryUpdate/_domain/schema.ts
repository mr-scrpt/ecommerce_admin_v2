import { deliveryBaseSchema } from "@/kernel/domain/delivery/delivery.schema";
import { z } from "zod";

export const deliverySelectorSchema = z.object({
  id: z.string(),
});

export const deliveryUpdateSchema = deliveryBaseSchema;
