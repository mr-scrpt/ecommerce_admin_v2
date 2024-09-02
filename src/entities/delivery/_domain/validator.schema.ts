import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getTypeInputSchema = z
  .object({
    settlementRef: z.string(),
  })
  .optional();

export const getByOrderInputSchema = z.object({
  orderId: z.string(),
});

export const getListOutputSchema = z.array(deliverySchema);

export const getWithRelationOutputSchema = z.object({
  ...deliverySchema.shape,

  settlement: settlementSchema,
});
