import { OrderPaymentStatusEnum, OrderStatusEnum } from "@/entities/order";
import { z } from "zod";

export const orderOwnerDataSchema = z.object({
  owner: z.object({
    id: z.string(),
    email: z.string(),
    phone: z.string(),
    name: z.string(),
    image: z.string().nullable(),
  }),
  orderList: z.array(
    z.object({
      id: z.string(),
      orderNo: z.number(),
      userId: z.string(),
      createdAt: z.date(),
      priceTotal: z.number(),

      orderStatus: z.custom<OrderStatusEnum>(),
      paymentStatus: z.custom<OrderPaymentStatusEnum>(),
    }),
  ),
});
