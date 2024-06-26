import { z } from "zod";
import { OrderPaymentStatusEnum, OrderStatusEnum } from "./order.types";
import { orderRowSchema } from "./orderRow.schema";

// NOTE: Base Schema
export const orderStatusGroupSchema = z.object({
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

const orderBaseSchema = z.object({
  orderNo: z.number(),
  userId: z.string(),
  priceTotal: z.number(),
  createdAt: z.date(),
  ...orderStatusGroupSchema.shape,
});

export const orderSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,
});

export const orderRelationSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,

  orderRowList: orderRowSchema.array(),
});

export const orderUpdateStausSchema = z.object({
  id: z.string(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});
