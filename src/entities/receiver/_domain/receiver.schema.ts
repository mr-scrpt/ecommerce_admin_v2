import { orderSchema } from "@/kernel/domain/order/order.schema";
import { receiverSchema } from "@/kernel/domain/receiver/receiver.schema";
import { z } from "zod";

// NOTE: Relations
export const receiverRelationSchema = z.object({
  ...receiverSchema.shape,

  orderList: z.array(orderSchema),
});
