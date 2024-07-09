import { z } from "zod";
import { DeliveryTypeEnum } from "./delivery.type";

// NOTE: Base Schema
export const deliveryBaseSchema = z.object({
  orderId: z.string(),
  deliveryType: z.nativeEnum(DeliveryTypeEnum),
  // settlement: z.string(),
  settlementRef: z.string(),
  street: z.string().optional().nullable(),
  house: z.string().optional().nullable(),
  apartment: z.string().optional().nullable(),
  postOffice: z.string().optional().nullable(),
  store: z.string().optional().nullable(),
});

// NOTE: Projections
export const deliverySchema = z.object({
  id: z.string(),
  ...deliveryBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
