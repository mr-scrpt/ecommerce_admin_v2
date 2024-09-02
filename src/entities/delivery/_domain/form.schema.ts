import { DELIVERY_TYPE } from "@/kernel/domain/delivery/delivery.type";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information
export const deliveryFormDefaultSchema = z.object({
  // orderId: z.string(),
  // userId: z.string(),
  // receiverId: z.string(),
  // deliveryType: z.nativeEnum(DeliveryTypeEnum),
  deliveryType: selectItemSchema(z.nativeEnum(DELIVERY_TYPE)),
  // settlementRef: z.string(),
  // postOffice: z.string(),
  // storeId: z.string(),
  // addressId: z.string(),
});

export type DeliveryFormDefaultValues = z.infer<
  typeof deliveryFormDefaultSchema
>;
