import { ProductSelectListOptionExtended } from "../_domain/ui.type";

export const groupProductOptionList = (
  productList: Array<ProductSelectListOptionExtended>,
) => ({
  available: productList.filter(
    (product) => !product.disabled && product.inStock,
  ),
  inOrder: productList.filter((product) => product.disabled),
  outOfStock: productList.filter((product) => !product.inStock),
});
