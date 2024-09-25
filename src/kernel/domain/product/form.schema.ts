import { z } from "zod";
import { Product } from "./product.type";
import { filterNullValues } from "@/shared/lib/filter";

// NOTE: Select Product Option
export const productDefaultSelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  article: z.string(),
  name: z.string(),
  inStock: z.boolean(),

  active: z.boolean().optional(),
});

export type ProductDefaultSelectOption = z.infer<
  typeof productDefaultSelectOptionSchema
>;

// NOTE: Build Product Option
export const buildProductOption = (
  product?: Product | null,
): ProductDefaultSelectOption | null =>
  product
    ? {
        value: product.id,
        label: product.name,
        name: product.name,
        article: product.article,
        inStock: !!product.inStock,
      }
    : null;

export const buildProductOptionsArray = (
  postOffice?: Array<Product | null | undefined> | null,
): Array<ProductDefaultSelectOption> =>
  postOffice ? filterNullValues(postOffice.map(buildProductOption)) : [];
