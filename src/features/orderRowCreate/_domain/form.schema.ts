import { orderRowFormDefaultSchema } from "@/entities/order/_domain/orderRow/form.schema";
import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

export const orderRowCreateFormSchema = orderRowFormDefaultSchema
  .pick({
    quantity: true,
  })
  .extend({
    product: selectItemSchema(z.string()),
  });

export type OrderRowCreateFormValues = z.infer<typeof orderRowCreateFormSchema>;
