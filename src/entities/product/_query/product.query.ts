"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductAction } from "../_action/getProduct.action";
import { ProductId, baseQueryKey } from "../_domain/types";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";

export const getProductQuery = (productId: ProductId) => ({
  queryKey: [baseQueryKey, "getProduct", productId],
  queryFn: () => getProductAction({ productId }),
});

export const useProductQuery = (productId: ProductId) => {
  const query = getProductQuery(productId);
  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenProductUpdate();

  return {
    isPending,
    isSuccess,
    product: data?.product,
  };
};

export const useInvalidateProduct = () => {
  const queryClient = useQueryClient();
  // console.log("output_log: invalidateQueries Product =>>>");

  return (productId: ProductId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getProduct", productId],
    });
};
