import { cartSchema } from "@/kernel/domain/cart/cart.schema";
import { consumerSchema } from "@/kernel/domain/consumer/consumer.schema";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import { z } from "zod";

// NOTE: Relation
export const consumerRelationSchema = z.object({
  ...consumerSchema.shape,
  orderList: z.array(orderSchema),
  cart: z.nullable(cartSchema),
  receiverList: z.array(z.any()),
});
