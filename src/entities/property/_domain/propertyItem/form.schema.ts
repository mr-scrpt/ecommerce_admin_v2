import { z } from "zod";

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
