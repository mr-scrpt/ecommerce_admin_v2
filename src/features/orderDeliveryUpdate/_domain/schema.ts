import { deliverySchema } from "@/entities/delivery/server";
import { z } from "zod";

export const orderDeliveryUpdateSchema = z.object({
  ...deliverySchema.shape,
});
