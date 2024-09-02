import { inputDebounce } from "@/shared/lib/debounce";
import { useMemo } from "react";
import { useProductListSearchQuery } from "../_query/productListSearch.query";
import { useAppearanceDelay } from "@/shared/lib/react";

export const useProductListSearchToSelectModel = () => {
  const { productList, isPending, searchValue, toSearch } =
    useProductListSearchQuery();

  const productListToSelect = useMemo(
    () =>
      productList.map((product) => ({
        label: product.name,
        article: product.article,
        value: product.id,
        inStock: !!product.inStock,
      })),
    [productList],
  );

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
