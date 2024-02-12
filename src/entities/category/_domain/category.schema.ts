import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),
});

export const categoryCreateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  board: z.array(z.string()),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
