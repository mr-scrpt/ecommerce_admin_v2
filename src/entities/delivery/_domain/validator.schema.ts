import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { deliveryTypeSchema } from "@/kernel/domain/delivery/deliveryType.schema";
import { z } from "zod";
import { deliveryRelationSchema } from "./delivery.schema";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getTypeInputSchema = z.object({
  settlementRef: z.string().optional(),
});

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});

export const getListOutputSchema = z.array(deliverySchema);
export const getTypeListOutputSchema = z.array(deliveryTypeSchema);

export const getWithRelationOutputSchema = z.object({
  ...deliveryRelationSchema.shape,

  // settlement: settlementSchema,
  // deliveryType: deliveryTypeSchema,
});
