import { orderBaseSchema } from "@/kernel/domain/order/order.schema";

export const orderEmptyCreateSchema = orderBaseSchema.pick({
  userId: true,
});
