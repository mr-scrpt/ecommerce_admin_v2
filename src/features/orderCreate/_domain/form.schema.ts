import { consumerFormDefaultSchema } from "@/entities/consumer";
import { consumerDefaultSelectOptionSchema } from "@/kernel/domain/consumer/form.schema";
import { z } from "zod";

export const orderCreateFormSchema = consumerFormDefaultSchema
  .pick({
    consumer: true,
  })
  .extend({
    consumer: consumerDefaultSelectOptionSchema,
  });

export type OrderCreateFormValues = z.infer<typeof orderCreateFormSchema>;

// TODO: Default Form Values
// export const orderCreateFieldsValues: OrderCreateFormValues = {
//   consumerList: [],
// };
