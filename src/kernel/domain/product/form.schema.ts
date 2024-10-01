import { z } from "zod";
import { Product } from "./product.type";
import { filterNullValues } from "@/shared/lib/filter";
import { ProductSelectListOptionExtended } from "@/kernel/domain/product/ui.type";

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
  productList?: Array<Product | null | undefined> | null,
): Array<ProductDefaultSelectOption> =>
  productList ? filterNullValues(productList.map(buildProductOption)) : [];

export const buildProductOptionsExtendedArray = (
  productList: Array<ProductDefaultSelectOption> | undefined,
  productInOrder: Array<string> | undefined,
): Array<ProductSelectListOptionExtended> =>
  productList?.map((product) => ({
    ...product,
    disabled: !!productInOrder?.find((row) => row === product.value),
  })) || [];

export const buildProductOptionsGroupArray = (
  productList: Array<ProductSelectListOptionExtended>,
) => ({
  available: productList.filter(
    (product) => !product.disabled && product.inStock,
  ),
  inOrder: productList.filter((product) => product.disabled),
  outOfStock: productList.filter((product) => !product.inStock),
});
