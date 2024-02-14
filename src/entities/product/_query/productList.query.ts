"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductListAction } from "../_action/getProductList.action";
import { ProductId, baseQueryKey } from "../_domain/types";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";

export const getProductListQuery = (productId: ProductId) => ({
  queryKey: [baseQueryKey, "getProductList"],
  queryFn: () => getProductListAction({ productId }),
});

export const useProductListQuery = (productId: ProductId) => {
  const query = getProductListQuery(productId);
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
