import { z } from "zod";

// NOTE: Base schema

export const profileFormDefaultSchema = z.object({
  name: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(30).min(2)),

  email: z.string().email(),
  // phone: z.string().or(z.literal("")),
  phone: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(18).min(9)),
  image: z.string().optional(),
});

export type ProfileFormDefaultValues = z.infer<typeof profileFormDefaultSchema>;
