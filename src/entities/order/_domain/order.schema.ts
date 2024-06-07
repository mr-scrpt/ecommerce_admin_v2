import { z } from "zod";
import { orderRowSchema } from "./orderRow.schema";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";

// NOTE: Group
export const orderStatusGroupSchema = z.object({
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

// NOTE: Base Schema
const orderBaseSchema = z.object({
  orderNo: z.number(),
  userId: z.string(),
  priceTotal: z.number(),
  createdAt: z.date(),
  ...orderStatusGroupSchema.shape,
});

// NOTE: Main
export const orderSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,
});

export const orderRelationSchema = z.object({
  id: z.string(),
  ...orderBaseSchema.shape,

  orderRowList: orderRowSchema.array(),
});

// export const orderUpdateStausSchema = z.object({
//   id: z.string(),
//   orderStatus: z.custom<OrderStatusEnum>(),
//   paymentStatus: z.custom<OrderPaymentStatusEnum>(),
// });
