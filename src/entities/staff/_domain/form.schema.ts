import { staffDefaultSelectOptionSchema } from "@/kernel/domain/staff/form.schema";
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
  staff: staffDefaultSelectOptionSchema.optional().nullable(),

  // role: z.custom<RoleEnum>(),
});

export type StaffFormDefaultValues<
  T extends z.ZodTypeAny = typeof staffFormDefaultSchema,
> = z.infer<T>;

export const staffDefaultFieldsValues: StaffFormDefaultValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  staff: null,
};
