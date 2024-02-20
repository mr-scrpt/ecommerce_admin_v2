import { z } from "zod";

export const optionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  createdAt: z.date(),
});

export const optionItemCreateSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const optionItemUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
});

export const optionItemFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Option must not be shorter than 1 characters." })
    .max(30, {
      message: "Option must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  value: z.string(),
});

export type OptionItemFormValues = z.infer<typeof optionItemFormSchema>;
