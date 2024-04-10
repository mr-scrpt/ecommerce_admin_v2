import { Role } from "@/shared/lib/user";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const userFormDefaultSchema = z.object({
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  name: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(30).min(2)),

  image: z.string().optional(),
  emailVerified: z.date().nullable().optional(),
  role: z.custom<Role>(),
});

export type UserFormDefaultValues = z.infer<typeof userFormDefaultSchema>;
