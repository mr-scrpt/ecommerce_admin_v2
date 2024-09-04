import { z } from "zod";
import { DELIVERY_TYPE } from "./delivery.type";

// NOTE: Base Schema
export const deliveryTypeBaseSchema = z.object({
  type: z.nativeEnum(DELIVERY_TYPE),
});

// NOTE: Projections
export const deliveryTypeSchema = z.object({
  id: z.string(),
  ...deliveryTypeBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
