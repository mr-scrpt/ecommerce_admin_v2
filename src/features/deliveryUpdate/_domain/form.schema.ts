import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { z } from "zod";

export const deliveryUpdateFormSchema = z.object({
  ...deliveryFormDefaultSchema.shape,
});

export type DeliveryUpdateFormValues = z.infer<typeof deliveryUpdateFormSchema>;
