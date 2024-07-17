import { cartSchema } from "@/kernel/domain/cart/cart.schema";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import { staffSchema } from "@/kernel/domain/staff/staff.schema";
import { z } from "zod";

// NOTE: Relation
export const staffRelationSchema = z.object({
  ...staffSchema.shape,
  orderList: z.array(orderSchema),
  cart: z.nullable(cartSchema),
  receiverList: z.array(z.any()),
});
