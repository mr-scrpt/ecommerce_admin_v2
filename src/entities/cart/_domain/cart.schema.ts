import { cartCompositeSchema } from "@/kernel/domain/cart/cart.schema";
import { z } from "zod";

export const cartRelationSchema = z.object({
  ...cartCompositeSchema.shape,
});
