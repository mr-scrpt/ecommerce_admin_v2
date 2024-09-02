import { orderFormDefaultSchema } from "@/entities/order";
import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// NOTE: Order update
export const orderUpdateFormSchema = orderFormDefaultSchema;

export type OrderUpdateFormValues = z.infer<typeof orderUpdateFormSchema>;

// NOTE: Order row create
// export const orderRowCreateFormSchema = orderRowSchema.pick({
//   productId: true,
//   quantity: true,
// });
//
// export type OrderRowCreateFormValues = z.infer<typeof orderRowCreateFormSchema>;
export const orderRowCreateFormSchema = z.object({
  product: selectItemSchema(z.string()).optional(),
});
export type OrderRowCreateFormValues = z.infer<typeof orderRowCreateFormSchema>;
