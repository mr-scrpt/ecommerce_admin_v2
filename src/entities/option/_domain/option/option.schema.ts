import { z } from "zod";

export const optionSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),
});

export const optionCreateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const optionUpdateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const optionFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  board: z.array(z.string()),
});

export type OptionFormValues = z.infer<typeof optionFormSchema>;
