import { orderRowSchema } from "@/kernel/domain/order/orderRow.schema";
import { productSchema } from "@/kernel/domain/product/product.schema";
import { z } from "zod";

// NOTE: Relation
export const orderRowRelationSchema = z.object({
  ...orderRowSchema.shape,
  product: productSchema,
});
