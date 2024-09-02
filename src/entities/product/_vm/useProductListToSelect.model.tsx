import { useOptionListTransform } from "@/shared/lib/map";
import { useProductListQuery } from "../_query/productList.query";

export const useProductListToSelectModel = () => {
  const { productList, isPending, isSuccess, isFetchedAfterMount } =
    useProductListQuery();

  const { toOptionList } = useOptionListTransform();

  const productListToSelect = toOptionList(productList);

  return {
    productListToSelect,
    isPending,
    isSuccess,
    isFetchedAfterMount,
  };
};
