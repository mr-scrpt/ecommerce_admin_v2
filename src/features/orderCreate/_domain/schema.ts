import { orderBaseSchema } from "@/kernel/domain/order/order.schema";
import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order/order.type";
import { orderRowBaseSchema } from "@/kernel/domain/order/orderRow.schema";
import { z } from "zod";

export const orderCreateSchema = z.object({
  orderStatus: z.nativeEnum(OrderStatusEnum),
  orderPayment: z.nativeEnum(OrderPaymentStatusEnum),
});

export const orderEmptyCreateSchema = orderBaseSchema.pick({
  userId: true,
});

export const orderRowCreateSchema = orderRowBaseSchema.pick({
  productId: true,
  quantity: true,
});
