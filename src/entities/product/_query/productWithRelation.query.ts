"use client";
import { productApi } from "../_api/product.api";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";

type QueryParams = {
  id: string;
};

export const useProductWithRelationQuery = (query: QueryParams) => {
  const { isPending, isSuccess, data, isFetchedAfterMount } =
    productApi.product.getRelation.useQuery(query);

  useListenProductUpdate();

  return {
    isPending,
    isSuccess,
    isFetchedAfterMount,
    product: data,
  };
};

export const useInvalidateProductWithRelation = () => {
  const invalidateProduct =
    productApi.useUtils().product.getRelation.invalidate;

  return (query: QueryParams) => invalidateProduct(query);
};
