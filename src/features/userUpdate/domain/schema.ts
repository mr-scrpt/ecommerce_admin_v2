import { Role } from "@/shared/lib/user";
import { z } from "zod";

export const userUpdateFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),

  image: z.string().optional(),
  emailVerified: z.date().nullable().optional(),
  role: z.custom<Role>(),
});

export type UserUpdateFormValues = z.infer<typeof userUpdateFormSchema>;
