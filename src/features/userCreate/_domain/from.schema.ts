import { z } from "zod";

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
    .transform((name) => name.trim()),
});

export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;
