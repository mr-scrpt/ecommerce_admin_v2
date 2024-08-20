import { z } from "zod";

// NOTE: Select Option
export const selectItemSchema = <T extends z.ZodTypeAny = z.ZodString>(
  valueSchema: T = z.string() as unknown as T,
) =>
  z.object({
    value: valueSchema,
    label: z.string(),
    active: z.boolean().optional(),
  });

const defaultStringSchema = selectItemSchema();

export type SelectOptionItem = z.infer<typeof defaultStringSchema>;

// NOTE: Select Option With Id
export const selectItemWithIdSchema = <T extends z.ZodTypeAny = z.ZodString>(
  valueSchema: T = z.string() as unknown as T,
) =>
  z.object({
    value: valueSchema,
    label: z.string(),
    id: z.string(),
    active: z.boolean().optional(),
  });

const defaultStringWithIdSchema = selectItemWithIdSchema();

export type SelectOptionItemWithId = z.infer<typeof defaultStringWithIdSchema>;

export const dataOptionItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type DataOptionItem = z.infer<typeof dataOptionItemSchema>;
