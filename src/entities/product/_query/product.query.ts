"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductListAction } from "../_action/getProductList.action";
import {
  getProductAction,
  getProductBySlugAction,
} from "../_action/getProduct.action";
import { useListenProductListUpdate } from "../_vm/event/useListenProductListUpdate";
import { useListenProductUpdate } from "../_vm/event/useListenProductUpdate";
import { ProductId } from "../_domain/types";
import { Slug } from "@/shared/type/common.type";

const baseKey = "product";

export const getProductQuery = (productId: ProductId) => ({
  queryKey: [baseKey, "getProductById", productId],
  queryFn: () => getProductAction({ productId }),
});

export const useProductQuery = (productId: ProductId) => {
  const query = getProductQuery(productId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenProductUpdate();

  return {
    isPending,
    isSuccess,
    data,
  };
};

export const getProductBySlugQuery = (productSlug: Slug) => ({
  queryKey: [baseKey, "getProductBySlug", productSlug],
  queryFn: () => getProductBySlugAction({ productSlug }),
});

export const useProductBySlugQuery = (productSlug: Slug) => {
  const query = getProductBySlugQuery(productSlug);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenProductUpdate();

  return {
    isPending,
    isSuccess,
    product: data?.product,
  };
};

export const getProductListQuery = (productId: ProductId) => ({
  queryKey: [baseKey, "getProductList"],
  queryFn: () => getProductListAction({ productId }),
});

export const useProductListQuery = (productId: ProductId) => {
  const query = getProductListQuery(productId);
  const { isPending, isSuccess, data } = useQuery(query);

  useListenProductListUpdate();

  return {
    isPending,
    isSuccess,
    data: data ? data.productList : [],
  };
};

export const useInvalidateProduct = () => {
  const queryClient = useQueryClient();

  return (productId: ProductId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getProductById", productId],
    });
};

export const useInvalidateProductList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getProductList"],
    });
};
