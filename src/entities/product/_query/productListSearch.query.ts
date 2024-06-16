"use client";
import { useEffect, useState } from "react";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";
import { productApi } from "../_api/product.api";

export const useProductListSearchQuery = () => {
  const [q, setQ] = useState<string>("");

  const invalidate = useInvalidateProductList(q);

  useEffect(() => {
    if (q) {
      invalidate();
    }
  }, [invalidate, q]);

  const { isPending, isFetchedAfterMount, isSuccess, data } =
    productApi.product.search.useQuery({ q });

  useListenProductListUpdate();

  return {
    toSearch: (q: string) => setQ(q),
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data: data ?? [],
  };
};

export const useInvalidateProductList = (q: string) => {
  const queryClient = productApi.useUtils().product.search.invalidate;

  return () => queryClient({ q });
};
