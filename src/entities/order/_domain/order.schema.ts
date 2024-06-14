import { z } from "zod";
import { orderRowSchema } from "./orderRow.schema";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";

// NOTE: Side
const orderDeliverySchema = z.object({
  id: z.string(),
});

// NOTE: Group
export const orderStatusGroupSchema = z.object({
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

// NOTE: Base Schema
export const orderBaseSchema = z.object({
  orderNo: z.string(),
  userId: z.string(),
  priceTotal: z.number(),
  ...orderStatusGroupSchema.shape,
  createdAt: z.date(),
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
  delivery: orderDeliverySchema,
});

// export const orderUpdateStausSchema = z.object({
//   id: z.string(),
//   orderStatus: z.custom<OrderStatusEnum>(),
//   paymentStatus: z.custom<OrderPaymentStatusEnum>(),
// });
