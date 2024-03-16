import { z } from "zod";
import { OrderPaymentStatusEnum, OrderStatusEnum } from "./types";

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
  createdAt: z.date(),
});

export const orderRowSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
  createdAt: z.date(),
});

export const orderRelationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
  createdAt: z.date(),

  orderRowList: orderRowSchema.array(),
});

export const orderFormSchema = z.object({
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
