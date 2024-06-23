import { z } from "zod";
import { OrderPaymentStatusEnum, OrderStatusEnum } from "./order.type";

// NOTE: Base Schema
export const orderBaseSchema = z.object({
  orderNo: z.string(),
  userId: z.string(),
  priceTotal: z.number(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

// NOTE: Projections
export const orderSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
