import { RoleEnum } from "@/kernel/domain/role.type";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const userFormDefaultSchema = z.object({
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

  emailVerified: z.date().nullable().optional(),
  // role: z.custom<Role>(),

  deliveryType: z.nativeEnum(RoleEnum),
});

export type UserFormDefaultValues = z.infer<typeof userFormDefaultSchema>;
