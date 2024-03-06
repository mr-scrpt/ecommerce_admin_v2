"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductWithRelationAction } from "../_action/getProductWithRelation.action";
import { ProductId, baseQueryKey } from "../_domain/types";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";

export const getProductWithRelationQuery = (productId: ProductId) => ({
  queryKey: [baseQueryKey, "getProduct", productId],
  queryFn: () => {
    return getProductWithRelationAction({ productId });
  },
});

export const useProductWithRelationQuery = (productId: ProductId) => {
  const query = getProductWithRelationQuery(productId);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenProductUpdate();

  return {
    isPending,
    isSuccess,
    product: data?.product,
    isFetchedAfterMount,
  };
};

// export const useInvalidateProductWithRelation = () => {
//   const queryClient = useQueryClient();
//
//   return (productId: ProductId) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseQueryKey, "getProductWithRelation", productId],
//     });
// };
