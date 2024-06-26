"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProductListSearchAction } from "../_action/getProductListSearch.action";
import { baseQueryKey } from "../_domain/types";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";

export const getProductListSearchQuery = (q: string) =>
  queryOptions({
    queryKey: [baseQueryKey, "getProductListSearch", q],
    queryFn: () => {
      return getProductListSearchAction({ q });
    },
  });

export const useProductListSearchQuery = () => {
  const [q, setQ] = useState<string>("");

  const invalidate = useInvalidateProductList(q);

  useEffect(() => {
    if (q) {
      invalidate();
    }
  }, [invalidate, q]);

  const query = getProductListSearchQuery(q);

  const { isPending, isFetchedAfterMount, isSuccess, data } = useQuery(query);

  useListenProductListUpdate();

  return {
    toSearch: (q: string) => setQ(q),
    searchValue: q,
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data: data ? data.productList : [],
  };
};

export const useInvalidateProductList = (q: string) => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getProductListSearch", q],
    });
};
