import {
  OrderPaymentStatusEnum,
  OrderStatusEnum,
} from "@/kernel/domain/order.type";
import { z } from "zod";

export const consumerSchema = z.object({
  consumerData: z.object({
    id: z.string(),
    email: z.string(),
    phone: z.string(),
    name: z.string(),
    image: z.string().nullable(),
  }),
  orderListData: z.array(
    z.object({
      id: z.string(),
      orderNo: z.string(),
      userId: z.string(),
      createdAt: z.date(),
      priceTotal: z.number(),

      orderStatus: z.custom<OrderStatusEnum>(),
      paymentStatus: z.custom<OrderPaymentStatusEnum>(),
    }),
  ),
});
