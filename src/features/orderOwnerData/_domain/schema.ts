import { OrderPaymentStatusEnum, OrderStatusEnum } from "@/entities/order";
import { z } from "zod";

export const orderOwnerDataSchema = z.object({
  owner: z.object({
    id: z.string(),
    email: z.string(),
    phone: z.string(),
    name: z.string(),
    image: z.string().nullable().optional(),
  }),
  orderList: z.array(
    z.object({
      id: z.string(),
      orderNo: z.string(),
      userId: z.string(),
      createdAt: z.date(),

      orderStatus: z.custom<OrderStatusEnum>(),
      paymentStatus: z.custom<OrderPaymentStatusEnum>(),
    }),
  ),
});
