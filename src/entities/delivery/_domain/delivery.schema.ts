import { z } from "zod";
import { DeliveryTypeEnum } from "./delivery.types";

// NOTE: Base Schema

const deliveryBaseSchema = z.object({
  orderId: z.string(),
  deliveryType: z.custom<DeliveryTypeEnum>(),
  // area: z.string(),
  // araeCode: z.string(),
  city: z.string(),
  // cityCode: z.string(),
  street: z.string().nullable(),
  house: z.string().nullable(),
  apartment: z.string().nullable(),
  postOffice: z.string().nullable(),
  pickupPoint: z.string().nullable(),
});

export const deliverySchema = z.object({
  id: z.string(),
  ...deliveryBaseSchema.shape,
});

export const settleToSelectSchema = z.object({
  value: z.string(),
  area: z.string(),
  label: z.string(),
});
