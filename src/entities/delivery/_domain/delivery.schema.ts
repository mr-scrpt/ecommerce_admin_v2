import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { deliveryTypeSchema } from "@/kernel/domain/delivery/deliveryType.schema";
import { postOfficeSchema } from "@/kernel/domain/post/post.schema";
import { settlementSchema } from "@/kernel/domain/settlement/settlement.schema";
import { z } from "zod";

// NOTE: Relation
export const deliveryRelationSchema = z.object({
  ...deliverySchema.shape,
  deliveryType: deliveryTypeSchema,
  settlement: settlementSchema,
  postOffice: postOfficeSchema.nullable(),
});
