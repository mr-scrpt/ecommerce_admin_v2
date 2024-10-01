import {
  buildProductOptionsArray,
  buildProductOptionsExtendedArray,
  buildProductOptionsGroupArray,
} from "@/kernel/domain/product/form.schema";
import { useProductListSearchQuery } from "../_query/productListSearch.query";

export const useProductListGroupSearchToSelectModel = (
  productInOrder: Array<string>,
) => {
  const {
    productList,
    isPending: isProductPending,
    searchValue,
    toSearch,
  } = useProductListSearchQuery();

  const orderRowListWithDisabled = buildProductOptionsExtendedArray(
    buildProductOptionsArray(productList),
    productInOrder,
  );

  const productListGroup = buildProductOptionsGroupArray(
    orderRowListWithDisabled,
  );

  return {
    toSearch,
    searchValue,
    productList,
    productListGroup,
    isPending: isProductPending,
  };
};
