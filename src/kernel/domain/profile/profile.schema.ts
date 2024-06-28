import { z } from "zod";

// NOTE: Base schema
export const profileBaseSchema = z.object({
  name: z.string().nullable(),
  phone: z.string(),
  email: z.string(),
  image: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const profileSchema = z.object({
  id: z.string(),
  ...profileBaseSchema.shape,
});
