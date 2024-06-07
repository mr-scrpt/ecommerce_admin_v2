import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";
import { z } from "zod";

export const orderCreateSchema = z.object({
  orderStatus: z.custom<OrderStatusEnum>(),
  orderPayment: z.custom<OrderPaymentStatusEnum>(),
});

export const orderEmptyCreateSchema = z.object({
  userId: z.string(),
});

export const orderRowCreateSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
