import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import { z } from "zod";

export const orderRowCreateFormSchema = orderRowSchema.pick({
  productId: true,
  quantity: true,
});

export type OrderRowCreateValues = z.infer<typeof orderRowCreateFormSchema>;
