import { addressSchema } from "@/kernel/domain/address/address.schema";
import { deliverySchema } from "@/kernel/domain/delivery/delivery.schema";
import { z } from "zod";

// NOTE: Relations
export const addressRelationSchema = z.object({
  ...addressSchema.shape,

  deliveryList: z.array(deliverySchema),
});
