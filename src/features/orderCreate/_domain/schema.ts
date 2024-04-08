import { OrderPaymentStatusEnum, OrderStatusEnum } from "@/entities/order";
import { z } from "zod";

export const orderRowAddSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const orderCreateSchema = z.object({
  orderRowData: z.array(orderRowAddSchema),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});
