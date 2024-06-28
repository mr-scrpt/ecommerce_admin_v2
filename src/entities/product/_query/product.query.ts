"use client";
import { Product } from "@/kernel/domain/product/product.type";
import { productApi } from "../_api/product.api";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";

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
