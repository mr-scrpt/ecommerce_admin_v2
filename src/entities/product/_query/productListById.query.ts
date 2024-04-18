"use client";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductListByIdAction } from "../_action/getProductListById.action";
import { baseQueryKey } from "../_domain/types";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";

export const getProductListByIdQuery = (productListId: Array<string>) =>
  queryOptions({
    queryKey: [baseQueryKey, "getProductList", productListId],
    queryFn: () => {
      return getProductListByIdAction({ productListId });
    },
  });

export const useProductListByIdQuery = (productListId: Array<string>) => {
  const query = getProductListByIdQuery(productListId);
  const { isPending, isFetchedAfterMount, isSuccess, data } = useQuery(query);

  useListenProductListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    data: data ? data.productList : [],
  };
};

export const useInvalidateProductByIdList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getProductList"],
    });
};
