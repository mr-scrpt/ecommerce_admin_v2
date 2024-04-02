import { OrderPaymentStatusEnum, OrderStatusEnum } from "@/entities/order";
import { orderRowAddSchema } from "@/entities/order/server";
import { z } from "zod";

export const orderCreateSchema = z.object({
  orderRowData: z.array(orderRowAddSchema),
  orderStatus: z.custom<OrderStatusEnum>(),
  paymentStatus: z.custom<OrderPaymentStatusEnum>(),
});
