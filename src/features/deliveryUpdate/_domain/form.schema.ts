import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { z } from "zod";

export const deliveryUpdateFormSchema = deliveryFormDefaultSchema.pick({
  userId: true,
  receiverId: true,
  deliveryType: true,
  settlementRef: true,
  postOffice: true,
  storeId: true,
  addressId: true,
});

export type DeliveryUpdateFormValues = z.infer<typeof deliveryUpdateFormSchema>;
