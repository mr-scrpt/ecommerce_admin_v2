"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartWithRelationAction } from "../_action/getCartWithRelation.action";
import { CartId, baseQueryKey } from "../_domain/types";
import { useListenCartUpdate } from "../_vm/event/useListenCartUpdate";

export const getCartWithRelationQuery = (cartId: CartId) => ({
  queryKey: [baseQueryKey, "getCart", cartId],
  queryFn: () => {
    return getCartWithRelationAction({ cartId });
  },
});

export const useCartWithRelationQuery = (cartId: CartId) => {
  const query = getCartWithRelationQuery(cartId);

  const { isPending, isSuccess, data, isFetchedAfterMount } = useQuery(query);

  useListenCartUpdate();

  return {
    isPending,
    isSuccess,
    cart: data?.cart,
    isFetchedAfterMount,
  };
};

export const useInvalidateCartWithRelation = () => {
  const queryClient = useQueryClient();

  return (cartId: CartId) =>
    queryClient.invalidateQueries({
      queryKey: [baseQueryKey, "getCartWithRelation", cartId],
    });
};
