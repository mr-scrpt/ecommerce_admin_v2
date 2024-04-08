import { productBaseSchema } from "@/entities/product/server";
import { z } from "zod";

export const productUpdateSchema = z.object({
  id: z.string(),

  ...productBaseSchema.omit({ slug: true }).shape,

  categoryList: z.array(
    z.object({
      id: z.string(),
    }),
  ),
  propertyItemListSelected: z.array(z.object({ id: z.string() })),
});
