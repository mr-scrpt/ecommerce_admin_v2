import { cartSchema } from "@/kernel/domain/cart/cart.schema";
import { cartRowSchema } from "@/kernel/domain/cart/cartRow.schema";
import { productSchema } from "@/kernel/domain/product/product.schema";
import { z } from "zod";

// NOTE: Relations
export const cartRowRelationSchema = z.object({
  ...cartRowSchema.shape,
  cartId: cartSchema.shape.id,
  productId: productSchema.shape.id,
});
