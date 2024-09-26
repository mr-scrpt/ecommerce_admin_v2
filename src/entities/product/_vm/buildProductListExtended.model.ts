import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";
import { ProductSelectListOptionExtended } from "../_domain/ui.type";

export const buildProductListExtended = (
  productList: Array<ProductDefaultSelectOption> | undefined,
  productInOrder: Array<string> | undefined,
): Array<ProductSelectListOptionExtended> =>
  productList?.map((product) => ({
    ...product,
    disabled: !!productInOrder?.find((row) => row === product.value),
  })) || [];
