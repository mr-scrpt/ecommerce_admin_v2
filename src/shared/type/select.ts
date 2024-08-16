import { z } from "zod";

// export type SelectItemValues = { value: string; label: string };
export const selectItemSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type SelectItemValues = z.infer<typeof selectItemSchema>;

export const dataOptionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type DataOptionItem = z.infer<typeof dataOptionItemSchema>;
