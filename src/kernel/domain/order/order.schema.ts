import { z } from "zod";

// NOTE: Base Schema
export const orderBaseSchema = z.object({
  orderNo: z.string(),
  userId: z.string(),
  priceTotal: z.number(),
  orderStatusStateId: z.string(),
  orderStatusPaymentId: z.string(),
});

// NOTE: Projections
export const orderSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
