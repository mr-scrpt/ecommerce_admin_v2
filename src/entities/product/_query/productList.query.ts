"use client";
import { productApi } from "../_api/product.api";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";

export const useProductListQuery = () => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    productApi.product.getList.useQuery();

  useListenProductUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    product: data,
  };
};

export const useInvalidateProduct = () => {
  const invalidateProduct = productApi.useUtils().product.getList.invalidate;

  return () => invalidateProduct();
};
