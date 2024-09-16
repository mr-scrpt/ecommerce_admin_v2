import { orderBaseSchema } from "@/kernel/domain/order/order.schema";
import {
  ORDER_STATUS_PAYMENT,
  ORDER_STATUS_STATE,
} from "@/kernel/domain/order/orderStatus.type";
import { orderRowBaseSchema } from "@/kernel/domain/order/orderRow.schema";
import { z } from "zod";

export const orderCreateSchema = z.object({
  orderStatusState: z.nativeEnum(ORDER_STATUS_STATE),
  orderStatusPayment: z.nativeEnum(ORDER_STATUS_PAYMENT),
});

export const orderEmptyCreateSchema = orderBaseSchema.pick({
  userId: true,
});

export const orderRowCreateSchema = orderRowBaseSchema.pick({
  productId: true,
  quantity: true,
});
