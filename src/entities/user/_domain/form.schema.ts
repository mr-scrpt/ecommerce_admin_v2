import { z } from "zod";

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
