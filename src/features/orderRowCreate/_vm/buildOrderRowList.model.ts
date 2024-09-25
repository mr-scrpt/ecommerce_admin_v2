import { OrderRow } from "@/kernel/domain/order/orderRow.type";
import { ProductDefaultSelectOption } from "@/kernel/domain/product/form.schema";
import { OrderProductSelectListOption } from "../_domain/ui.type";

export const buildOrderRowListWith = (
  productList: ProductDefaultSelectOption[] | undefined,
  orderRowList: Array<OrderRow> | undefined,
): Array<OrderProductSelectListOption> =>
  productList?.map((product) => ({
    ...product,
    disabled: !!orderRowList?.find((row) => row.productId === product.value),
  })) || [];
