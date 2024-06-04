"use client";
import { cartApi } from "../_api/cart.api";
import { useListenCartUpdate } from "../_vm/event/useListenCartUpdate";

// TODO: need id to invalidate?
export const useCartWithRelationQuery = () => {
  // const query = getCartWithRelationQuery(cartId);

  const { isPending, isSuccess, data, isFetchedAfterMount } =
    cartApi.cart.getWithRelation.useQuery();

  useListenCartUpdate();

  return {
    isPending,
    isSuccess,
    cart: data,
    isFetchedAfterMount,
  };
};

export const useInvalidateCartWithRelation = () => {
  const invalidateCart = cartApi.useUtils().cart.getWithRelation.invalidate;

  return () => invalidateCart();
};
