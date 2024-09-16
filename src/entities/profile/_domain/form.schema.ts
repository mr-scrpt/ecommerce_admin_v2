import { profileDefaultSelectOptionSchema } from "@/kernel/domain/profile/form.schema";
import { z } from "zod";

export const profileFormDefaultSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  // .optional(),
  lastName: z.string().max(30),
  email: z.string().email(),
  phone: z.string().or(z.literal("")),
  image: z.string().optional(),
  profile: profileDefaultSelectOptionSchema.optional().nullable(),
});

export type ProfileFormDefaultValues<
  T extends z.ZodTypeAny = typeof profileFormDefaultSchema,
> = z.infer<T>;

export const profileDefaultFieldsValues: ProfileFormDefaultValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  image: "",
  profile: null,
};
