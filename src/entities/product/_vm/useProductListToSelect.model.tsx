import { buildProductOptionsArray } from "@/kernel/domain/product/form.schema";
import { useProductListQuery } from "../_query/productList.query";

export const useProductListToSelectModel = () => {
  const { productList, isPending, isSuccess, isFetchedAfterMount } =
    useProductListQuery();

  const productListToSelect = buildProductOptionsArray(productList);

  return {
    productListToSelect,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  };
};
