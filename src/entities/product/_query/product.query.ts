"use client";
import { productApi } from "../_api/product.api";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";

type QueryParams = {
  id: string;
};

export const useProductQuery = (query: QueryParams) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    productApi.product.get.useQuery(query);

  useListenProductUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    product: data,
  };
};

export const useInvalidateProduct = () => {
  const invalidateProduct = productApi.useUtils().product.get.invalidate;

  return (query: QueryParams) => invalidateProduct(query);
};
