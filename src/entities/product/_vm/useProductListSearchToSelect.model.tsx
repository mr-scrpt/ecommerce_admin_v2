import { inputDebounce } from "@/shared/lib/debounce";
import { useMemo } from "react";
import { useProductListSearchQuery } from "../_query/productListSearch.query";
import { useAppearanceDelay } from "@/shared/lib/react";
import { buildProductOptionsArray } from "@/kernel/domain/product/form.schema";

export const useProductListSearchToSelectModel = () => {
  const { productList, isPending, searchValue, toSearch } =
    useProductListSearchQuery();

  const productListToSelect = buildProductOptionsArray(productList);

  const debouncedToSearch = useMemo(
    () => inputDebounce((search) => toSearch?.(search)),
    [toSearch],
  );

  const isAppearancePending = useAppearanceDelay(isPending);

  return {
    toSearch: debouncedToSearch,
    searchValue,
    productListToSelect,
    isAppearancePending,
  };
};
