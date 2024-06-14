import { DeliveryTypeEnum } from "@/kernel/domain/delivery.type";
import { z } from "zod";

// NOTE: Base Schema
export const deliveryBaseSchema = z.object({
  orderId: z.string(),
  deliveryType: z.custom<DeliveryTypeEnum>(),
  settlement: z.string(),
  street: z.string().nullable(),
  house: z.string().nullable(),
  apartment: z.string().nullable(),
  postOffice: z.string().nullable(),
  pickupPoint: z.string().nullable(),
  createdAt: z.date(),
});

// NOTE: Main
export const deliverySchema = z.object({
  id: z.string(),
  ...deliveryBaseSchema.shape,
});
