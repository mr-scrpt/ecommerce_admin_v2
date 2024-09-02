import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import { z } from "zod";

// NOTE: Relation

export const orderRelationSchema = z.object({
  ...orderSchema.shape,
  orderRowList: orderRowSchema.array(),
  delivery: deliverySchema,
});
