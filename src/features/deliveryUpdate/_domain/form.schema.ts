import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";
import { z } from "zod";

// export const deliveryUpdateFormSchema = z.object({
//   ...deliveryFormDefaultSchema.shape,
// });

export const deliveryUpdateFormSchema = deliveryFormDefaultSchema
  .pick({
    settlement: true,
    street: true,
    house: true,
  })
  .extend({
    orderId: z.string(),
    deliveryType: z.nativeEnum(DeliveryTypeEnum),
    settlementRef: z.string(),
    postOffice: z.string(),
    store: z.string(),
  });

export type DeliveryUpdateFormValues = z.infer<typeof deliveryUpdateFormSchema>;
