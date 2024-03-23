import { useOrderWithRelationQuery } from "@/entities/order";
import { useProductListQuery } from "@/entities/product";

export const useOrderProductListToSelect = (orderId: string) => {
  const { data: productData, isPending: isProductPending } =
    useProductListQuery();
  const { order, isPending: isOrderPending } =
    useOrderWithRelationQuery(orderId);
  // console.log("output_log: order =>>>", order);

  const productList = productData?.map((item) => ({
    label: item.name,
    value: item.id,
    disabled: order?.orderRowList.find((row) => {
      console.log("output_log:  row =>>>", row.productId, item.id);
      return row.productId === item.id;
    }),
    inStock: !!item.inStock,
  }));
  // console.log("output_log:  productList =>>>", productList);

  return {
    productList,
    isPending: isOrderPending || isProductPending || !order,
  };
};
