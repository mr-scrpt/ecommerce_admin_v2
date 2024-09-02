"use client";
import { Product } from "@/kernel/domain/product/product.type";
import { productApi } from "../_api/product.api";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";

export const useProductListQuery = () => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    productApi.product.getList.useQuery<Array<Product>>();

  useListenProductListUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    productList: data ?? [],
  };
};

export const useInvalidateProductList = () => {
  const invalidateProductList =
    productApi.useUtils().product.getList.invalidate;

  return () => invalidateProductList();
};
