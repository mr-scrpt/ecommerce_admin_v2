import { Role } from "@/shared/lib/user";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const userFormDefaultSchema = z.object({
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .min(3, {
      message: "Username must not be shorter than 3!! characters.",
    })
    .transform((name) => name.trim()),
  image: z.string().optional(),
  emailVerified: z.date().nullable().optional(),
  role: z.custom<Role>(),
});

export type UserFormDefaultValues = z.infer<typeof userFormDefaultSchema>;
