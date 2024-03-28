import { z } from "zod";

export const profileSchema = z.object({
  email: z.string(),
  phone: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export const profileFormSchema = z.object({
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

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
