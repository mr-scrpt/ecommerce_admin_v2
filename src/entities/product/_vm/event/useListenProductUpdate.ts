"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateProduct } from "../../_query/product.query";

export const useListenProductUpdate = () => {
  const invalidateProduct = useInvalidateProduct();

  useSocketHandler(WSEventEnum.PRODUCT_REFRESH, (productId: string) => {
    console.log("output_log: product invalidate =>>>", productId);
    invalidateProduct(productId);
  });
};
