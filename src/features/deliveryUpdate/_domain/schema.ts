import { deliveryBaseSchema } from "@/entities/delivery/server";
import { z } from "zod";

export const deliverySelectorSchema = z.object({
  id: z.string(),
});

export const deliveryUpdateSchema = deliveryBaseSchema.omit({
  orderId: true,
  createdAt: true,
});
