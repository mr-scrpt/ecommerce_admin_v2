import { addressSchema } from "@/kernel/domain/address/address.schema";
import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { deliveryTypeSchema } from "@/kernel/domain/delivery/deliveryType.schema";
import { postOfficeSchema } from "@/kernel/domain/post/post.schema";
import { receiverSchema } from "@/kernel/domain/receiver/receiver.schema";
import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";
import { storeSchema } from "@/kernel/domain/store/store.schema";
import { z } from "zod";

// NOTE: Relation
export const deliveryRelationSchema = z.object({
  ...deliverySchema.shape,
  deliveryType: deliveryTypeSchema,
  settlement: settlementSchema,
  postOffice: postOfficeSchema.nullable(),
  store: storeSchema.nullable(),
  address: addressSchema.nullable(),

  // receiver: receiverSchema,
});
