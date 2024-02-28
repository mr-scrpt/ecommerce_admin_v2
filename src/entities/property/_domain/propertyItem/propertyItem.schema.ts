import { z } from "zod";

export const propertyItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  createdAt: z.date(),
});

export const propertyItemCreateSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const propertyItemUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
});

export const propertyItemFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Property must not be shorter than 1 characters." })
    .max(30, {
      message: "Property must not be longer than 30 characters.",
    })
    .transform((name) => name.trim()),
  value: z.string(),
});

export type PropertyItemFormValues = z.infer<typeof propertyItemFormSchema>;
