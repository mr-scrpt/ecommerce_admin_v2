import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { deliveryTypeSchema } from "@/kernel/domain/delivery/deliveryType.schema";
import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getTypeInputSchema = z.object({
  settlementRef: z.string(),
});

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});

export const getListOutputSchema = z.array(deliverySchema);
export const getTypeListOutputSchema = z.array(deliveryTypeSchema);

export const getWithRelationOutputSchema = z.object({
  ...deliverySchema.shape,

  settlement: settlementSchema,
});
