import { z } from "zod";

export const optionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  board: z.array(z.string()),
  createdAt: z.date(),
});

export const optionItemCreateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const optionItemUpdateSchema = z.object({
  name: z.string(),
  board: z.array(z.string()),
});

export const optionItemFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  board: z.array(z.string()),
});

export type OptionItemFormValues = z.infer<typeof optionItemFormSchema>;
