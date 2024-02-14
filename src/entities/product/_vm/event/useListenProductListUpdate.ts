"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateProductList } from "../../_query/product.query";

export const useListenProductListUpdate = () => {
  const invalidateProductList = useInvalidateProductList();

  useSocketHandler(WSEventEnum.PRODUCT_LIST_REFRESH, () => {
    console.log("output_log: product list invalidate =>>>");
    invalidateProductList();
  });
};
