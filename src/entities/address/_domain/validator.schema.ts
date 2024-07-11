import { addressSchema } from "@/kernel/domain/address/address.schema";
import { z } from "zod";

export const getInputSchema = z.object({
  id: z.string(),
});

export const getByUserInputSchema = z.object({
  userId: z.string(),
});

export const getByUserAndSettlementRefInputSchema = z.object({
  userId: z.string().optional(),
  settlementRef: z.string().optional(),
});

export const getByDeliveryInputSchema = z.object({
  deliveryId: z.string(),
});

export const getListOutputSchema = z.array(addressSchema);
