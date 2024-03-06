"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { ProductId } from "../../_domain/types";
import { useInvalidateProduct } from "../../_query/cart.query";

export const useListenProductUpdate = () => {
  const invalidateProduct = useInvalidateProduct();

  useSocketHandler(WSEventEnum.PRODUCT_REFRESH, (productId: ProductId) => {
    console.log("output_log: product invalidate =>>>", productId);
    invalidateProduct(productId);
  });
};
