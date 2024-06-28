import { DeliveryTypeEnum } from "@/kernel/domain/delivery/delivery.type";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const deliveryFormDefaultSchema = z.object({
  orderId: z.string(),
  deliveryType: z.nativeEnum(DeliveryTypeEnum),
  settlement: z.string(),
  street: z.string(),
  house: z.string(),
  apartment: z.string(),
  postOffice: z.string(),
  pickupPoint: z.string(),
});

export type DeliveryFormDefaultValues = z.infer<
  typeof deliveryFormDefaultSchema
>;
