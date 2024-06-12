"use client";
import { useSocketHandler } from "@/shared/lib/socket";
import { WSEventEnum } from "@/shared/type/websokcetEvent.enum";
import { useInvalidateProductList } from "../../_query/productList.query";

export const useListenProductListUpdate = () => {
  console.log("output_log:  =>>> invalidate");
  const invalidateProductList = useInvalidateProductList();

  useSocketHandler(WSEventEnum.PRODUCT_LIST_REFRESH, () => {
    console.log("output_log: product list invalidate =>>>");
    invalidateProductList();
  });
};
