"use client";
import { productApi } from "../_api/product.api";
import { Product } from "../_domain/product.types";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";

// type QueryParams = {
//   id: string;
// };

export const useProductQuery = (id: string) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    productApi.product.get.useQuery<Product>({ id });

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

  return (id: string) => invalidateProduct({ id });
};
