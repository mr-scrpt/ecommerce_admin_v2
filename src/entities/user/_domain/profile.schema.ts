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

export const profileFormDefaultSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  image: z.string().optional(),
});

export type ProfileFormDefaultValues = z.infer<typeof profileFormDefaultSchema>;
