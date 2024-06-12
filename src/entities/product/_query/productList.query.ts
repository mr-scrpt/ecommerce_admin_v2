"use client";
import { productApi } from "../_api/product.api";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";

export const useProductListQuery = () => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    productApi.product.getList.useQuery();

  useListenProductListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    product: data,
  };
};

export const useInvalidateProductList = () => {
  const invalidateProductList =
    productApi.useUtils().product.getList.invalidate;

  return () => invalidateProductList();
};
