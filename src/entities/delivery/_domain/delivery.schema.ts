import { DeliveryTypeEnum } from "@/kernel/domain/delivery.type";
import { z } from "zod";

// NOTE: Base Schema
const deliveryBaseSchema = z.object({
  orderId: z.string(),
  deliveryType: z.custom<DeliveryTypeEnum>(),
  // area: z.string(),
  // araeCode: z.string(),
  settlement: z.string(),
  // cityCode: z.string(),
  street: z.string().nullable(),
  house: z.string().nullable(),
  apartment: z.string().nullable(),
  postOffice: z.string().nullable(),
  pickupPoint: z.string().nullable(),
});

// NOTE: Main
export const deliverySchema = z.object({
  id: z.string(),
  ...deliveryBaseSchema.shape,
});
