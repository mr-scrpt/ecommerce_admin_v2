import { receiverFormDefaultSchema } from "@/entities/receiver";
import { receiverDefaultSelectOptionSchema } from "@/kernel/domain/receiver/form.schema";
import { z } from "zod";

// NOTE: Order Receiver update
// export const orderReceiverUpdateFormSchema = receiverFormDefaultSchema.pick({
//   receiverList: true,
// });

export const orderReceiverUpdateFormSchema = z.object({
  orderReceiverList: z.array(receiverDefaultSelectOptionSchema),
});
export type OrderReceiverUpdateFormValues = z.infer<
  typeof orderReceiverUpdateFormSchema
>;

// NOTE: Default Form Values
export const orderReceiverUpdateFieldsValues: OrderReceiverUpdateFormValues = {
  orderReceiverList: [],
};
