import { z } from "zod";

export const profileFormDefaultSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  // .optional(),
  lastName: z.string().max(30),
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  image: z.string().optional(),
});

export type ProfileFormDefaultValues = z.infer<typeof profileFormDefaultSchema>;
