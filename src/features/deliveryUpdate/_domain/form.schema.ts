import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { z } from "zod";

// export const deliveryUpdateFormSchema = z.object({
//   ...deliveryFormDefaultSchema.shape,
// });

export const deliveryUpdateFormSchema = deliveryFormDefaultSchema.pick({
  deliveryType: true,
  settlement: true,
  street: true,
  house: true,
  apartment: true,
  postOffice: true,
  pickupPoint: true,
});

export type DeliveryUpdateFormValues = z.infer<typeof deliveryUpdateFormSchema>;
