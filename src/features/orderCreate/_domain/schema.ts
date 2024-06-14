import { orderBaseSchema, orderRowBaseSchema } from "@/entities/order/server";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";
import { z } from "zod";

export const orderCreateSchema = z.object({
  orderStatus: z.custom<OrderStatusEnum>(),
  orderPayment: z.custom<OrderPaymentStatusEnum>(),
});

export const orderEmptyCreateSchema = orderBaseSchema.pick({
  userId: true,
});

export const orderRowCreateSchema = orderRowBaseSchema.pick({
  productId: true,
  quantity: true,
});
