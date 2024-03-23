import { useOrderWithRelationQuery } from "@/entities/order";
import {
  useProductListQuery,
  useProductListSearchQuery,
} from "@/entities/product";

export const useOrderProductListToSelect = (orderId: string) => {
  const {
    data: productData,
    isPending: isProductPending,
    searchValue,
    toSearch,
  } = useProductListSearchQuery();

  const { order, isPending: isOrderPending } =
    useOrderWithRelationQuery(orderId);

  const productList = productData?.map((item) => ({
    label: item.name,
    value: item.id,
    disabled: !!order?.orderRowList.find((row) => {
      return row.productId === item.id;
    }),
    inStock: !!item.inStock,
  }));

  return {
    toSearch,
    searchValue,
    productList,
    isPending: isOrderPending || isProductPending || !order,
  };
};
