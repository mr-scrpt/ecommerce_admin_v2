import { z } from "zod";
import { DeliveryTypeEnum } from "./delivery.type";

// NOTE: Base Schema
export const deliveryBaseSchema = z.object({
  orderId: z.string(),
  deliveryType: z.nativeEnum(DeliveryTypeEnum),
  settlement: z.string(),
  street: z.string().nullable(),
  house: z.string().nullable(),
  apartment: z.string().nullable(),
  postOffice: z.string().nullable(),
  pickupPoint: z.string().nullable(),
});

// NOTE: Projections
export const deliverySchema = z.object({
  id: z.string(),
  ...deliveryBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
