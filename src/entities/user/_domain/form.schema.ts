import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
