import { z } from "zod";
import { Category } from "./category.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Category Option
export const categoryDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  active: z.boolean().optional(),
});

export type CategoryDefaultSelectOption = z.infer<
  typeof categoryDefaultSelectOptionSchema
>;

// NOTE: Build Category Option
export const buildCategoryOption = (
  category?: Category | null,
): CategoryDefaultSelectOption | null =>
  category
    ? {
        value: category.id,
        label: category.name,
      }
    : null;

export const buildCategoryOptionsArray = (
  category?: Array<Category | null | undefined> | null,
): CategoryDefaultSelectOption[] =>
  category ? filterNullValues(category.map(buildCategoryOption)) : [];
