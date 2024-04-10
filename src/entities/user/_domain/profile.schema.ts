import { z } from "zod";

// NOTE: Base schema
const profileBaseSchema = z.object({
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  image: z.string(),
});

export const profileSchema = z.object({
  id: z.string(),
  ...profileBaseSchema.shape,
});

export const profileDammySchema = z.object({
  id: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  name: z.string().nullable(),
  image: z.string().nullable(),
});
