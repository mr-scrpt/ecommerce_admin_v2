import { buildProductOptionsArray } from "@/kernel/domain/product/form.schema";
import { useProductListSearchQuery } from "../_query/productListSearch.query";
import { buildProductListExtended } from "./buildProductListExtended.model";
import { groupProductOptionList } from "./groupProductOptionList.model";

export const useProductListGroupSearchToSelectModel = (
  productInOrder: Array<string>,
) => {
  const {
    productList,
    isPending: isProductPending,
    searchValue,
    toSearch,
  } = useProductListSearchQuery();

  const orderRowListWithDisabled = buildProductListExtended(
    buildProductOptionsArray(productList),
    productInOrder,
  );

  const productListGroup = groupProductOptionList(orderRowListWithDisabled);

  return {
    toSearch,
    searchValue,
    productList,
    productListGroup,
    isPending: isProductPending,
  };
};
