import { consumerSchema } from "@/kernel/domain/consumer/consumer.schema";
import { orderSchema } from "@/kernel/domain/order/order.schema";
import { z } from "zod";

// NOTE: Relation
export const consumerRelationSchema = z.object({
  consumerData: consumerSchema,
  orderListData: z.array(orderSchema),
});
