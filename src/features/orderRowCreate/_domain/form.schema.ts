import { orderRowFormDefaultSchema } from "@/entities/order/_domain/orderRow/form.schema";
import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import { productDefaultSelectOptionSchema } from "@/kernel/domain/product/form.schema";
import { z } from "zod";

export const orderRowCreateFormSchema = orderRowFormDefaultSchema
  .pick({
    quantity: true,
  })
  .extend({
    product: productDefaultSelectOptionSchema,
  });

export type OrderRowCreateFormValues = z.infer<typeof orderRowCreateFormSchema>;
