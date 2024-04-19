import { z } from "zod";
import { DeliveryTypeEnum } from "./delivery.types";

// NOTE: FORM
// NOTE: Main information

export const deliveryFormDefaultSchema = z.object({
  orderId: z.string(),
  deliveryType: z.custom<DeliveryTypeEnum>(),
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
