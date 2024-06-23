import { z } from "zod";

// NOTE: Base
export const productBaseSchema = z.object({
  name: z.string(),
  article: z.string(),
  price: z.number().positive(),
  inStock: z.number().nonnegative(),
  slug: z.string(),

  description: z.string(),
  about: z.string(),

  img: z.array(z.string()),
});

// NOTE: Projections
export const productSchema = z.object({
  id: z.string(),
  ...productBaseSchema.shape,
  createdAt: z.date(),
  updatedAt: z.date(),
});
