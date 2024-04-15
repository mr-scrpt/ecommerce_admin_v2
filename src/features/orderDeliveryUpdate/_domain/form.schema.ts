import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { z } from "zod";

export const orderDeliveryUpdateFormSchema = z.object({
  ...deliveryFormDefaultSchema.shape,
});

export type OrderDeliveryUpdateFormValues = z.infer<
  typeof orderDeliveryUpdateFormSchema
>;
