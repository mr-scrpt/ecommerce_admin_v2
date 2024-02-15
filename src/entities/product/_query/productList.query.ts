"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductListAction } from "../_action/getProductList.action";
import { baseQueryKey } from "../_domain/types";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";

export const getProductListQuery = () => ({
  queryKey: [baseQueryKey, "getProductList"],
  queryFn: () => getProductListAction(),
});

export const useProductListQuery = () => {
  const query = getProductListQuery();
  const { isPending, isSuccess, data } = useQuery(query);

  useListenProductListUpdate();

  return {
    isPending,
    isSuccess,
    data: data ? data.productList : [],
  };
};

export const useInvalidateProductList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getProductList"],
    });
};
