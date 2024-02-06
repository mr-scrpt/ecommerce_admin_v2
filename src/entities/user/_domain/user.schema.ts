import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  email: z.string(),
  role: z.string(),
  emailVerified: z.date().nullable(),
  createdAt: z.date(),

  image: z.string().nullable().optional(),
});

export const userFormSchema = z.object({
  email: z.string().email().optional(),
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  image: z.string().optional(),
  emailVerified: z.date().nullable().optional(),
  role: z.string(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
