import { deliveryFormDefaultSchema } from "@/entities/delivery";
import { selectSettlementItemSchema } from "@/kernel/domain/settlement/settlement.schema";
import { selectItemSchema } from "@/shared/type/select";
import { z } from "zod";

// export const deliveryUpdateFormSchema = deliveryFormDefaultSchema.pick({
//   userId: true,
//   receiverId: true,
//   deliveryType: true,
//   settlementRef: true,
//   postOffice: true,
//   storeId: true,
//   addressId: true,
// });
export const deliveryUpdateFormSchema = deliveryFormDefaultSchema.extend({
  settlement: selectSettlementItemSchema(z.string()),
});

export type DeliveryUpdateFormValues = z.infer<typeof deliveryUpdateFormSchema>;
