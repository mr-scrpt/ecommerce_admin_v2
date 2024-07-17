import { RoleEnum } from "@/kernel/domain/role.type";
import { z } from "zod";

// NOTE: FORM
// NOTE: Main information

export const staffFormDefaultSchema = z.object({
  name: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(30).min(2)),

  lastName: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(30).min(2)),
  email: z.string().email(),
  phone: z
    .string()
    .transform((name) => name.trim())
    .pipe(z.string().max(18).min(9)),

  role: z.custom<RoleEnum>(),
});

export type StaffFormDefaultValues = z.infer<typeof staffFormDefaultSchema>;

// NOTE: Select
export const staffSelectFromSchema = z.object({
  id: z.string(),
});

export type StaffSelectFormValues = z.infer<typeof staffSelectFromSchema>;
