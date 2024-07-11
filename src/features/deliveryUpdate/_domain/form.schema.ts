import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";
import { z } from "zod";

// export const deliveryUpdateFormSchema = z.object({
//   ...deliveryFormDefaultSchema.shape,
// });

export const deliveryUpdateFormSchema = deliveryFormDefaultSchema.pick({
  // orderId: true,
  userId: true,
  deliveryType: true,
  settlementRef: true,
  postOffice: true,
  storeId: true,
  addressId: true,
});
// .extend({
//   // orderId: z.string(),
//   settlementRef: z.string(),
//   postOffice: z.string(),
//   store: z.string(),
// });

export type DeliveryUpdateFormValues = z.infer<typeof deliveryUpdateFormSchema>;
