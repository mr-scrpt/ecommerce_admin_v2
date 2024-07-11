import { z } from "zod";
import { DeliveryTypeEnum } from "./delivery.type";

// NOTE: Base Schema
export const deliveryBaseSchema = z.object({
  orderId: z.string(),
  userId: z.string(),
  deliveryType: z.nativeEnum(DeliveryTypeEnum),
  // settlementRef: z.string().optional().nullable(),
  // postOffice: z.string().optional().nullable(),
  // storeId: z.string().optional().nullable(),
  // addressId: z.string().optional().nullable(),

  settlementRef: z.string().nullable(),
  postOffice: z.string().nullable(),
  storeId: z.string().nullable(),
  addressId: z.string().nullable(),
});

// NOTE: Projections
export const deliverySchema = z.object({
  id: z.string(),
  ...deliveryBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
