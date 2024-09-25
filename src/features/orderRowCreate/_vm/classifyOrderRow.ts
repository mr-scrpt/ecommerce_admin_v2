import { OrderProductSelectListOption } from "../_domain/ui.type";

export const classifyOrderRow = (
  productList: Array<OrderProductSelectListOption>,
) => ({
  available: productList.filter(
    (product) => !product.disabled && product.inStock,
  ),
  inOrder: productList.filter((product) => product.disabled),
  outOfStock: productList.filter((product) => !product.inStock),
});
