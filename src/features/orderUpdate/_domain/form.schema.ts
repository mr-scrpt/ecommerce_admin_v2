import { orderFormDefaultSchema } from "@/entities/order";
import { productDefaultSelectOptionSchema } from "@/kernel/domain/product/form.schema";
import { z } from "zod";

// NOTE: Order update
export const orderUpdateFormSchema = orderFormDefaultSchema;

export type OrderUpdateFormValues = z.infer<typeof orderUpdateFormSchema>;

export const orderRowCreateFormSchema = z.object({
  product: productDefaultSelectOptionSchema,
});
export type OrderRowCreateFormValues = z.infer<typeof orderRowCreateFormSchema>;
