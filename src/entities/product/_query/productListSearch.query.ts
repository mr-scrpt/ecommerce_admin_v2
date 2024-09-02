"use client";
import { useCallback, useState } from "react";
import { productApi } from "../_api/product.api";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";

export const useProductListSearchQuery = () => {
  const [q, setQ] = useState<string>("");

  const { isPending, isFetchedAfterMount, isSuccess, data } =
    productApi.product.search.useQuery({ q });

  const toSearch = useCallback(
    (q: string) => {
      setQ(q);
    },
    [setQ],
  );

  useListenProductListUpdate();

  return {
    toSearch,
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    productList: data ?? [],
  };
};

export const useInvalidateProductListSearchQuery = (q: string) => {
  const queryClient = productApi.useUtils().product.search.invalidate;

  return () => queryClient({ q });
};
