import { cartSchema } from "@/kernel/domain/cart/cart.schema";
import { z } from "zod";
import { cartRowRelationSchema } from "./cartRow.schema";

export const cartRelationSchema = z.object({
  ...cartSchema.shape,

  cartRowList: z.array(cartRowRelationSchema),
});
