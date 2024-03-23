import { useOrderWithRelationQuery } from "@/entities/order";
import { useProductListQuery } from "@/entities/product";

export const useOrderProductListToSelect = (orderId: string) => {
  const { data: productData, isPending: isProductPending } =
    useProductListQuery();
  const { order, isPending: isOrderPending } =
    useOrderWithRelationQuery(orderId);

  const productList = productData?.map((item) => ({
    label: item.name,
    value: item.id,
    disabled: !order?.orderRowList.find((row) => row.productId === item.id),
    inStock: item.inStock,
  }));

  return {
    productList,
    isPending: isOrderPending || isProductPending || !order,
  };
};
