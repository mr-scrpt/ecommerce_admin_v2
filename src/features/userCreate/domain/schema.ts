import { Role } from "@/shared/lib/user";
import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.custom<Role>(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable().optional(),
  createdAt: z.date(),
});

export const userCreateFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),

  // image: z.string().optional(),
  emailVerified: z.date().nullable().optional(),
  // role: z.custom<Role>(),
});

export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;
