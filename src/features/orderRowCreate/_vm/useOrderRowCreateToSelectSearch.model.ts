import { useOrderWithRelationQuery } from "@/entities/order";
import { useProductListSearchQuery } from "@/entities/product";
import { buildProductOptionsArray } from "@/kernel/domain/product/form.schema";
import { buildOrderRowListWith } from "./buildOrderRowList.model";
import { classifyOrderRow } from "./classifyOrderRow";

interface OrderRowCreateToSelectSearchProps {
  orderId: string;
}

export const useOrderRowCreateToSelectSearch = (
  props: OrderRowCreateToSelectSearchProps,
) => {
  const { orderId } = props;

  const {
    productList,
    isPending: isProductPending,
    searchValue,
    toSearch,
  } = useProductListSearchQuery();

  const { order, isPending: isOrderPending } =
    useOrderWithRelationQuery(orderId);

  const orderRowListWithDisabled = buildOrderRowListWith(
    buildProductOptionsArray(productList),
    order?.orderRowList,
  );

  const productGroup = classifyOrderRow(orderRowListWithDisabled);

  return {
    toSearch,
    searchValue,
    productList,
    productGroup,
    isPending: isOrderPending || isProductPending || !order,
  };
};
